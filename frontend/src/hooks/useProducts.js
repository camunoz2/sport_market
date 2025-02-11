import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/queries";

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
