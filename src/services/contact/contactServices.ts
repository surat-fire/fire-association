import api from "@/lib/axios";
import { ContactFormData } from "@/lib/validation/contactUsSchema";

export interface contactResponse {
  success: boolean;
  message: string;
}

export const sendContactInfo = async (
  formData: ContactFormData
): Promise<contactResponse> => {
  const response = await api.post("/api/contact", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
