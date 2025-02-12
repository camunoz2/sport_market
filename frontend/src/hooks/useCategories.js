import useFetch from "./useFetch";

function useCategories() {
  const {
    data: categories,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/api/categories`);
  return { categories, loading, error };
}

export default useCategories;
