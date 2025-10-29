import { blogsResponse, fetchBlogs } from "@/services/blogs/blogServices";
import { useQuery } from "@tanstack/react-query";

const useGetBlogs = () => {
  const { data, isLoading, error, refetch } = useQuery<
    blogsResponse,
    any,
    blogsResponse
  >({
    queryKey: ["public-blogs"],
    queryFn: () => fetchBlogs(),
  });
  return {
    data: data || { blogs: [], pagination: {} },
    isLoading,
    error,
    refetch,
  };
};

export default useGetBlogs;
