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

export const postProduct = (req, res) => {
  const { title, description, price } = req.body;

  if (title === undefined || description === undefined || price === undefined) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const id = uuidv4();

  return res.status(201).json({
    message: "Producto publicado correctamente",
    id,
    title,
    description,
    price,
  });
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
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
