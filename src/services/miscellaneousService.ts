import api from "@/lib/axios";
import { IBlog } from "@/models/Blog";
import { IEvent } from "@/types/event";

interface IHomeData {
  event: IEvent[];
  blog: IBlog;
}

export const fetchHomeData = async (): Promise<IHomeData> => {
  const response = await api.get("/api/home");
  return response.data;
};
