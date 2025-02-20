import { useQuery } from "@tanstack/react-query";
import { getProductsByUserId } from "../api/queries";

export default function useProductsByUserId(id) {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsByUserId(id),
  });

  return {
    products: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
