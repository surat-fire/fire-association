"use client";

import { deleteBlog } from "@/services/blogs/blogServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteBlog = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { mutateAsync, isPending, error };
};

export default useDeleteBlog;
