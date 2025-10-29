import {
  blogsDetailResponse,
  fetchBlogById,
} from "@/services/blogs/blogServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useGetBlogById = (id: string) => {
  const queryKey = useMemo(() => ["public-blog", id], [id]);
  const { data, isLoading, error, refetch } = useQuery<
    blogsDetailResponse,
    any,
    blogsDetailResponse
  >({
    queryKey: queryKey,
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });
  return { data: data, isLoading, error, refetch };
};

export default useGetBlogById;
