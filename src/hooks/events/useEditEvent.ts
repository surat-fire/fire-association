"use client";

import { updateEvent } from "@/services/events/eventServices";
import { IEvent } from "@/types/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditEvent = (
  id: string
): {
  mutateAsync: (event: FormData) => Promise<IEvent>;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (event: FormData) => updateEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useEditEvent;
