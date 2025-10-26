"use client";

import { deleteEvent } from "@/services/events/eventServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully!")
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message)
    },
  });
  return { mutateAsync, isPending, error };
};

export default useDeleteEvent;
