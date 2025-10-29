import api from "@/lib/axios";

interface deleteBlogResponse {
  message: string;
  success: boolean;
}

export interface blogsDetailResponse {
  author: string;
  content: string;
  createdAt: string;
  excerpt: string;
  featuredImage: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: string;
  isFeatured: boolean;
  _id: string;
}

export interface blogsArray {
  author: string;
  createdAt: string;
  excerpt: string;
  featuredImage: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: string;
  isFeatured: boolean;
  _id: string;
}

interface paginationObject {
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface blogsResponse {
  blogs: blogsArray[];
  pagination: paginationObject;
}

export const deleteBlog = async (id: string): Promise<deleteBlogResponse> => {
  const response = await api.delete(`/api/blogs/${id}`);
  return response.data;
};

export const fetchBlogs = async (): Promise<blogsResponse> => {
  const response = await api.get("/api/blogs");
  return response.data;
};

export const fetchBlogById = async (
  id: string
): Promise<blogsDetailResponse> => {
  const response = await api.get(`/api/blogs/${id}`);
  return response.data;
};
