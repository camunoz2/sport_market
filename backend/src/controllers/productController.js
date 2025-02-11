import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawCategories = fs.readFileSync(
  path.join(__dirname, "../data/categories.json"),
  "utf-8",
);
const categories = JSON.parse(rawCategories);

export const postProduct = async (req, res) => {
  const { title, description, price, category_id } = req.body;
  const image = req.file;

  if (!title || !description || !price || !category_id || !image) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO products (id, title, description, price, category_id, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, description, price, category_id, image.buffer],
    );
    return res.status(201).json({
      message: "Producto publicado correctamente",
      id,
      title,
      description,
      price,
      category_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCategories = (req, res) => {
  const categoriesWithImages = categories.categories.map((category) => ({
    ...category,
    image: `http://localhost:5454/assets/${category.image}`,
  }));
  res.json({ categories: categoriesWithImages });
};

export const getProducts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    const products = results.rows.map((product) => ({
      ...product,
      image: `data:image/jpeg;base64,${product.image.toString("base64")}`,
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
