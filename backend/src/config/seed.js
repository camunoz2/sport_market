import { readFile } from "fs/promises";
import pool from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DATABASE_URL, SEED_FILE } = process.env;

if (!DATABASE_URL || !SEED_FILE) {
  console.error("DATABASE_URL or SEED_FILE environment variable is missing.");
  process.exit(1);
}

(async () => {
  try {
    const categoriesPath = path.join(__dirname, "../data/categories.json");
    const categoriesData = await readFile(categoriesPath, "utf-8");
    const categories = JSON.parse(categoriesData).categories;

    const sql = await readFile(SEED_FILE, "utf-8");
    console.log(`Executing SQL from file: ${SEED_FILE}`);
    await pool.query(sql);

    console.log("Inserting products...");
    const imagePath = path.join(__dirname, "../../assets/notfound.png");
    const uploadDir = path.join(__dirname, "../data/uploads");

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (let i = 1; i <= 10; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      // Create a unique filename for each image
      const uniqueFilename = `${Date.now()}-${i}.webp`;
      const destinationPath = path.join(uploadDir, uniqueFilename);

      // Copy the image to the uploads directory
      await fs.promises.copyFile(imagePath, destinationPath);

      // Store the relative path in the database
      const relativeImagePath = `/uploads/${uniqueFilename}`;

      await pool.query(
        "INSERT INTO products (id, title, description, price, category, image) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          uuidv4(),
          `Product ${i}`,
          `Description for product ${i}`,
          (Math.random() * 100).toFixed(2),
          category.name,
          relativeImagePath, // Store the relative path as VARCHAR
        ],
      );
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  } finally {
    await pool.end();
    console.log("Database connection closed.");
  }
})();
