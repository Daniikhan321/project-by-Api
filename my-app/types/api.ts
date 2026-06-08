// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// For paginated responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// For requests that just return a message
export interface MessageResponse {
  message: string;
  success: boolean;
}

// API error shape
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}