import api from "@/lib/axios";

interface deleteBlogResponse {
  message: string
  success: boolean
}

export const deleteBlog = async (id: string): Promise<deleteBlogResponse> => {
    const response = await api.delete(`/api/blogs/${id}`);
    return response.data;
  };
  