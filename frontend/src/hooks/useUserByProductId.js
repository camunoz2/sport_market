import { useQuery } from "@tanstack/react-query";
import { getUserByProductId } from "../api/queries";

export default function useUserByProductId(id) {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByProductId(id),
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
