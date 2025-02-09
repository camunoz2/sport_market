import fs from "fs";
import path from "path";

// Correctamente obtenemos la ruta absoluta al archivo JSON
const filePath = path.resolve("src", "data", "users.json");

// Leemos el archivo JSON con la ruta correcta
let usersRawData = fs.readFileSync(filePath, "utf-8");
let usersJson = JSON.parse(usersRawData);

// Controllers
export const login = (req, res) => {
  const { email, password } = req.body;

  // Buscamos al usuario en el archivo JSON
  const user = usersJson.users.find(
    (user) => user.email === email && user.password === password,
  );

  if (user) {
    return res.json({
      token: "fake-jwt-token",
      email: user.email,
      name: user.name,
    });
  }

  return res.status(401).json({ message: "Credenciales inválidas" });
};

export const register = (req, res) => {
  const { name, email, password } = req.body;

  // Aquí podrías agregar la lógica para registrar al usuario (guardar los datos en un archivo o base de datos)
  return res
    .status(201)
    .json({ message: "Usuario registrado con éxito", name, email });
};
