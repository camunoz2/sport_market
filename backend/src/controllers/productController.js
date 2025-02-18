import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { HOST, PORT } from "../../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevelopment = process.env.NODE_ENV !== "production";

const rawCategories = fs.readFileSync(
  path.join(__dirname, "../data/categories.json"),
  "utf-8",
);
const categories = JSON.parse(rawCategories);

export const postProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  const imageUrl = req.file.location;

  if (!title || !description || !price || !category || !imageUrl) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO products (id, title, description, price, category, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, description, price, category, imageUrl],
    );
    return res.status(201).json({
      message: "Producto publicado correctamente",
      id,
      title,
      description,
      price,
      category,
      image: imageUrl,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = (req, res) => {
  const baseUrl = isDevelopment ? `${HOST}:${PORT}` : HOST;
  const categoriesWithImages = categories.categories.map((category) => ({
    ...category,
    image: `${baseUrl}/assets/${category.image}`,
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
