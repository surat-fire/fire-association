import api from "@/lib/axios";

export const fetchHomeData = async (): Promise<any> => {
  const response = await api.get("/api/home");
  return response.data;
};
