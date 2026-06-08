export interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// What you send when creating a new blog
export interface BlogFormData {
  title: string;
  body: string;
  userId: number;
}

// What you send when updating
export type UpdateBlogPayload = Partial<BlogFormData>;

// Blog with extra UI state (e.g. is it expanded?)
export interface BlogWithMeta extends Blog {
  isExpanded?: boolean;
  createdAt?: string;
}