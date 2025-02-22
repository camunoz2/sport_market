import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { HOST, PORT } from "../../server.js";
import testDBConnection from "../helpers/testDBConnection.js";

const isDevelopment = process.env.NODE_ENV !== "production";

export const getOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT products.id, products.title, products.description, products.price, products.image, orders.quantity, orders.purchase_date
      FROM orders
      INNER JOIN products ON orders.product_id = products.id
      WHERE orders.user_id = $1
      ORDER BY orders.purchase_date DESC`,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo las órdenes: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const postProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  const imageUrl = req.file.location;

  if (!title || !description || !price || !category || !imageUrl) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const id = uuidv4();

  try {
    await pool.query(
      "INSERT INTO products (id, title, description, price, category_id, image) VALUES ($1, $2, $3, $4, $5, $6)",
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

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Product with id ${id} not found` });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editProductsById = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET title = $1, description = $2, price = $3, image = $4 WHERE id = $5 RETURNING *",
      [title, description, price, imageUrl, id],
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Product with id ${id} not found` });
    }

    return res.status(200).json(result.rows[0]);
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

export const getUserByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT users.id, users.name, users.email 
      FROM users 
      JOIN products ON users.id = products.user_id 
      WHERE products.id = $1
    `;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found for this product" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const testDB = async (req, res) => {
  try {
    await testDBConnection();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
};

export const getProductsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM products WHERE user_id = $1`;
    const { rows } = await pool.query(query, [id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
