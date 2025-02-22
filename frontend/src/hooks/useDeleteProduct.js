import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductById } from "../api/queries";

export default function useDeleteProductById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}
