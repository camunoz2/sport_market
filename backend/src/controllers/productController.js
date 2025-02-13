import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { HOST, PORT } from "../../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawCategories = fs.readFileSync(
  path.join(__dirname, "../data/categories.json"),
  "utf-8",
);
const categories = JSON.parse(rawCategories);

export const postProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  const image = req.file;

  if (!title || !description || !price || !category || !image) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const imagePath = `/uploads/${image.filename}`;
  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO products (id, title, description, price, category, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, description, price, category, imagePath],
    );
    return res.status(201).json({
      message: "Producto publicado correctamente",
      id,
      title,
      description,
      price,
      category,
      image: imagePath,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCategories = (req, res) => {
  const categoriesWithImages = categories.categories.map((category) => ({
    ...category,
    image: `${HOST}:${PORT}/assets/${category.image}`,
  }));
  res.json({ categories: categoriesWithImages });
};

export const getProducts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
