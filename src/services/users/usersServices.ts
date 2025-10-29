import api from "@/lib/axios";
import { IUser } from "@/models/User";
import {
  IUserDeleteResponse,
  IUserResponse,
  IUserSpecificResponse,
} from "@/types/user";

export const fetchUsers = async (): Promise<IUserResponse> => {
  const response = await api.get("/api/users");
  return response.data;
};

export const fetchUser = async (id: string): Promise<IUserSpecificResponse> => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (formData: FormData): Promise<IUser> => {
  const response = await api.post("/api/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateUser = async (
  id: string,
  formData: FormData
): Promise<IUserSpecificResponse> => {
  const response = await api.put(`/api/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteUser = async (id: string): Promise<IUserDeleteResponse> => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};
