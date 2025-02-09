export const apiDocs = {
  login: {
    method: "POST",
    url: "/api/login",
    body: {
      email: "string",
      password: "string",
    },
    response: {
      token: "fake-jwt-token",
      email: "string",
      name: "string",
    },
  },
  register: {
    method: "POST",
    url: "/api/register",
    body: {
      email: "string",
      password: "string",
    },
    response: {
      message: "Usuario registrado correctamente",
    },
  },
  postProduct: {
    method: "POST",
    url: "/api/post",
    body: {
      title: "string",
      description: "string",
      price: "number",
    },
    response: {
      message: "Producto publicado correctamente",
    },
  },
  getCategories: {
    method: "GET",
    url: "/api/categories",
    response: {
      categories: [{ id: "string", name: "string" }],
    },
  },
  testDBConnection: { method: "GET", url: "/api/test-db" },
};
