import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/queries";

export default function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}
