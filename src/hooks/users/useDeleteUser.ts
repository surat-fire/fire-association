"use client";

import { deleteUser } from "@/services/users/usersServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useDeleteUser;
