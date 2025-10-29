import { fetchUsers } from "@/services/users/usersServices";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  return {
    data: data?.data || [],
    isLoading,
    error,
    refetch,
  };
};

export default useGetUsers;
