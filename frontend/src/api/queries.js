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

export async function deleteProductById(id) {
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("No se pudo eliminar producto");
  }
}

export async function getProductsByUserId(id) {
  if (!id) {
    throw new Error("Se debe proporcionar un id para la categoria");
  }
  const response = await fetch(`${BASE_URL}/api/users/${id}/products`);
  if (!response.ok) {
    throw new Error("No se puedieron fetchear los productos por el id");
  }
  return await response.json();
}

export async function getUserByProductId(id) {
  if (!id) {
    throw new Error("Necesitas proporcionar un id");
  }
  const response = await fetch(`${BASE_URL}/api/products/${id}/user`);
  if (!response.ok) {
    throw new Error(
      "No se pudo fetchear el usuario con el id seleccionado del producto",
    );
  }
  return await response.json();
}

export async function getCategoryAndProductsById(id) {
  if (!id) {
    throw new Error("Se debe proporcionar un id para la categoria");
  }

  const response = await fetch(`${BASE_URL}/api/categories/${id}`);
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
