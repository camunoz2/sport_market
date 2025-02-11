export async function getProducts() {
  const response = await fetch("http://localhost:5454/api/products");
  if (!response.ok) {
    throw new Error("No se pudo hacer fetch a los productos");
  }
  return response.json();
}

export async function getCategories() {
  const response = await fetch("http://localhost:5454/api/categories");
  if (!response.ok) {
    throw new Error("No se pudo hacer fetch a las categorias");
  }
  return response.json();
}
