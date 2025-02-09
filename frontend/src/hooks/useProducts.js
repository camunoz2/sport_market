import useFetch from "./useFetch";

function useProducts() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:5454/api/products");
  return { products, loading, error };
}

export default useProducts;
