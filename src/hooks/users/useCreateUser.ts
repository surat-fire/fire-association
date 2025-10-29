"use client";

import { IUser } from "@/models/User";
import { createUser } from "@/services/users/usersServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateUser = (): {
  mutateAsync: (user: FormData) => Promise<IUser>;
  isPending: boolean;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (user: FormData) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useCreateUser;
