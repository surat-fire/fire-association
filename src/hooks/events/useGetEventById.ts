import { fetchEvent } from "@/services/events/eventServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useGetEvent = (id: string) => {
  const queryKey = useMemo(() => ["event", id], [id]);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });
  return { data: data || undefined, isLoading, error, refetch };
};

export default useGetEvent;
