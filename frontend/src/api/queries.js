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

export async function getCategoryAndProductsById(id) {
  if (!id) {
    throw new Error("Se debe proporcionar un id para la categoria");
  }

  const response = await fetch(`http://localhost:5454/api/categories/${id}`);
  if (!response.ok) {
    throw new Error("No se pudo obtener la categoría y productos");
  }

  const data = await response.json();

  const categoryName =
    data.length > 0 ? data[0].category_name : "Categoría desconocida";

  return {
    name: categoryName,
    products: data,
  };
}

export async function getProductById(id) {
  if (!id) {
    throw new Error("Se debe proporcionar un id para el producto");
  }
  const response = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error("No se pudo hacer fetch al producto");
  }
  return await response.json();
}
