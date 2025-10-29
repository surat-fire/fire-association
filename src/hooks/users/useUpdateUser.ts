"use client";

import { updateUser } from "@/services/users/usersServices";
import { IUserSpecificResponse } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditUser = (
  id: string
): {
  mutateAsync: (user: FormData) => Promise<IUserSpecificResponse>;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (user: FormData) => updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useEditUser;
