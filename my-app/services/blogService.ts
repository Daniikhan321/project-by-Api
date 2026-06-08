import api from '@/lib/axiosInstance';
import {
  Blog,
  BlogFormData,
  UpdateBlogPayload
} from '@/types/blog';
import {
  ApiResponse,
  PaginatedResponse
} from '@/types/api';

// ─── GET all blogs ───────────────────────────────────────────────────────────
export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await api.get<ApiResponse<Blog[]>>('/blogs');
  return response.data.data;
};

// ─── GET paginated blogs ─────────────────────────────────────────────────────
export const getPaginatedBlogs = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Blog>> => {
  const response = await api.get<Blog[]>('/posts', {
    params: { _page: page, _limit: limit },
  });
  return {
    data: response.data,
    total: Number(response.headers['x-total-count']) || 0,
    page,
    limit,
    totalPages: Math.ceil(
      Number(response.headers['x-total-count']) / limit
    ),
  };
};

// ─── GET single blog by ID ───────────────────────────────────────────────────
export const getBlogById = async (id: number): Promise<Blog> => {
  const response = await api.get<Blog>(`/posts/${id}`);
  return response.data;
};

// ─── GET blogs by user ───────────────────────────────────────────────────────
export const getBlogsByUser = async (userId: number): Promise<Blog[]> => {
  const response = await api.get<Blog[]>('/posts', {
    params: { userId },
  });
  return response.data;
};

// ─── CREATE blog ─────────────────────────────────────────────────────────────
export const createBlog = async (
  payload: BlogFormData
): Promise<Blog> => {
  const response = await api.post<Blog>('/posts', payload);
  return response.data;
};

// ─── UPDATE blog (full replace) ──────────────────────────────────────────────
export const updateBlog = async (
  id: number,
  payload: BlogFormData
): Promise<Blog> => {
  const response = await api.put<Blog>(`/posts/${id}`, payload);
  return response.data;
};

// ─── PATCH blog (partial update) ─────────────────────────────────────────────
export const patchBlog = async (
  id: number,
  payload: UpdateBlogPayload
): Promise<Blog> => {
  const response = await api.patch<Blog>(`/posts/${id}`, payload);
  return response.data;
};

// ─── DELETE blog ─────────────────────────────────────────────────────────────
export const deleteBlog = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

// ─── Named export object (optional — cleaner imports) ────────────────────────
export const blogService = {
  getAll:      getAllBlogs,
  getPaginated: getPaginatedBlogs,
  getById:     getBlogById,
  getByUser:   getBlogsByUser,
  create:      createBlog,
  update:      updateBlog,
  patch:       patchBlog,
  delete:      deleteBlog,
};