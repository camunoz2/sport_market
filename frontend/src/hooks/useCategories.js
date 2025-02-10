import useFetch from "./useFetch";

function useCategories() {
  const {
    data: categories,
    loading,
    error,
  } = useFetch("http://localhost:5454/api/categories");
  return { categories, loading, error };
}

export default useCategories;
