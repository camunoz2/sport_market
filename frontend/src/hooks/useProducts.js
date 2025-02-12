import useFetch from "./useFetch";

function useProducts() {
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/api/products`);
  return { products, loading, error };
}

export default useProducts;
