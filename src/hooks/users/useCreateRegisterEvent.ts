"use client";

import { EventFormData } from "@/lib/validation/eventRegisterSchema";
import {
  createRegisterEventUser,
  eventRegisterResponse,
} from "@/services/users/RegisterEvent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEventRegistration = (): {
  mutateAsync: (event: EventFormData) => Promise<eventRegisterResponse>;
  isPending: boolean;
  error: Error | null;
} => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (event: EventFormData) =>
      createRegisterEventUser(event),
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useEventRegistration;
