import api from "@/lib/axios";
import { IEvent, IEventResponse, IEventSpecificResponse } from "@/types/event";

export const fetchEvents = async ({ search, sortBy, sortOrder }: { search?: string; sortBy?: string; sortOrder?: string }): Promise<IEventResponse> => {
  const response = await api.get("/api/events", {
    params: {
      search,
      sortBy,
      sortOrder
    }
  });
  return response.data;
};

export const fetchEvent = async (id: string): Promise<IEventSpecificResponse> => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const createEvent = async (formData: FormData): Promise<IEvent> => {
  const response = await api.post("/api/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateEvent = async (id: string, formData: FormData): Promise<IEvent> => {
  const response = await api.put(`/api/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const response = await api.delete(`/api/events/${id}`);
  return response.data;
};
