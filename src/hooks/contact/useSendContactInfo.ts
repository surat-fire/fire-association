"use client";

import { ContactFormData } from "@/lib/validation/contactUsSchema";
import {
  contactResponse,
  sendContactInfo,
} from "@/services/contact/contactServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSendContactInfo = (): {
  mutateAsync: (event: ContactFormData) => Promise<contactResponse>;
  isPending: boolean;
  error: Error | null;
} => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (event: ContactFormData) => sendContactInfo(event),
    onError: (error) => {
      console.error(error);
      toast.error(error.message)
    },
  });
  return { mutateAsync, isPending, error };
};

export default useSendContactInfo;
