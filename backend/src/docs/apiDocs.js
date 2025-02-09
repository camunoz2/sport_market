// Ejemplo de documentación
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
  };
  