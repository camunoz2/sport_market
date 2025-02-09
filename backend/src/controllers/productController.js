import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
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

  return res.status(201).json({
    message: "Producto publicado correctamente",
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
