import fs from 'fs';
import path from 'path';

// Correctamente obtenemos la ruta absoluta al archivo JSON
const filePath = path.resolve('src', 'data', 'users.json');

// Leemos el archivo JSON con la ruta correcta
let usersRawData = fs.readFileSync(filePath, 'utf-8');
let usersJson = JSON.parse(usersRawData);

// Controllers
export const login = (req, res) => {
  const { email, password } = req.body;
  
  // Buscamos al usuario en el archivo JSON
  const user = usersJson.users.find(user => user.email === email && user.password === password);
  
  if (user) {
    return res.json({ token: "fake-jwt-token", email: user.email, name: user.name });
  }

  return res.status(401).json({ message: "Credenciales inválidas" });
};

export const register = (req, res) => {
  const { name, lastName, email, password, address, city, state, zip } = req.body;

  // Verificar si el usuario ya existe
  if (usersJson.users.find(user => user.email === email)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Crear un nuevo usuario
  const newUser = {
    id: usersJson.users.length + 1,
    name,
    lastName,
    email,
    password,
    address,
    city,
    state,
    zip
  };

  // Agregar el nuevo usuario al array de usuarios
  usersJson.users.push(newUser);

  // Guardar los datos actualizados en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(usersJson, null, 2));

  return res.status(201).json({ message: "Usuario registrado con éxito", email });
};
