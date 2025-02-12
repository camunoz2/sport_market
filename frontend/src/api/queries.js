const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("No se pudo hacer fetch a los productos");
  }
  return await response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error("No se pudo hacer fetch a las categorias");
  }
  return await response.json();
}
