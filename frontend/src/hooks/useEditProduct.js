import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useEditProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}
