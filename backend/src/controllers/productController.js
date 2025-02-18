import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { HOST, PORT } from "../../server.js";

const isDevelopment = process.env.NODE_ENV !== "production";

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

export const getProductsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT p.*, c.name AS category_name 
       FROM products p 
       JOIN categories c ON p.category_id = c.id 
       WHERE p.category_id = $1`,
      [categoryId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: `Error fetcheando los productos: ${error}` });
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

export const getCategories = async (req, res) => {
  try {
    const baseUrl = isDevelopment ? `${HOST}:${PORT}` : HOST;

    const { rows: categories } = await pool.query("SELECT * FROM categories");

    const categoriesWithImages = categories.map((category) => ({
      ...category,
      image: category.image.includes("http")
        ? category.image
        : `${baseUrl}/assets/${category.image}`,
    }));

    res.json({ categories: categoriesWithImages });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
