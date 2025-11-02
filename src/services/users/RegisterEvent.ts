import api from "@/lib/axios";
import { EventFormData } from "@/lib/validation/eventRegisterSchema";
import { IEventRegistration } from "@/models/EventRegistration";

export interface eventRegisterResponse {
  success: boolean;
  data: IEventRegistration;
}

export const createRegisterEventUser = async (
  formData: EventFormData
): Promise<eventRegisterResponse> => {
  const response = await api.post("/api/event-registration", formData);
  return response.data;
};
