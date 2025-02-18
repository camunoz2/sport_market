import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "fake-jwt";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token,
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user and get the new user's id
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword],
    );

    const { id, name: userName, email: userEmail } = newUser.rows[0];

    // Return the user data, including the id
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { id, name: userName, email: userEmail },
    });
  } catch (error) {
    console.error("Error en register:", error.message);
    res.status(500).json({ message: "Error del servidor" });
  }
};
