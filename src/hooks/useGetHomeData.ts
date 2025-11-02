import { fetchHomeData } from "@/services/miscellaneousService";
import { useQuery } from "@tanstack/react-query";

const useGetHomeData = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["home-data"],
    queryFn: () => fetchHomeData(),
  });
  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

export default useGetHomeData;
