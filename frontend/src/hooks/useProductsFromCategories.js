import { useQuery } from "@tanstack/react-query";
import { getCategoryAndProductsById } from "../api/queries";

export default function useProductsFromCategories(id) {
  const query = useQuery({
    queryKey: ["products", id],
    queryFn: () => getCategoryAndProductsById(id),
  });

  return {
    products: query.data?.products || [],
    categoryName: query.data?.name || "Categoría desconocida",
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
