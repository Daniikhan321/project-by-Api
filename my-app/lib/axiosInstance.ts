import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// ─── 1. Create the Axios instance ───────────────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ─── 2. Helper — get token from storage ─────────────────────────────────────
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null; // SSR safe
  return localStorage.getItem('token');
};

const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

// ─── 3. REQUEST interceptor ─────────────────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    // Attach token to every request if it exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development only
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} → ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[API] Request error:', error.message);
    return Promise.reject(error);
  }
);

// ─── 4. Flag to prevent multiple refresh calls at once ──────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// ─── 5. RESPONSE interceptor ────────────────────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any 2xx response — just return it
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ── 401 Unauthorized → try token refresh ──
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();

        // Call your refresh endpoint
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || '/api'}/auth/refresh`,
          { refreshToken }
        );

        const newToken: string = data.token;

        // Save the new token
        localStorage.setItem('token', newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        // Retry the original failed request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed → log user out
        processQueue(refreshError as AxiosError, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    // ── Other error status codes ──
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('[API] 400 Bad Request:', error.response.data);
          break;
        case 403:
          console.error('[API] 403 Forbidden — no permission');
          break;
        case 404:
          console.error('[API] 404 Not Found:', error.config?.url);
          break;
        case 500:
          console.error('[API] 500 Server Error');
          break;
        default:
          console.error(`[API] Error ${error.response.status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API] No response received — check your network');
    } else {
      console.error('[API] Unexpected error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;