import { fetchEvents } from "@/services/events/eventServices";
import { useQuery } from "@tanstack/react-query";

const useGetEvents = (search?: string, sortBy?: string, sortOrder?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      fetchEvents({
        search: search || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      }),
  });
  return { data: data || undefined, isLoading, error, refetch };
};

export default useGetEvents;
