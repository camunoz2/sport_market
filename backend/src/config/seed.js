import { readFile } from "fs/promises";
import pool from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import s3Client from "./aws.js";
import mime from "mime-types";
import { Upload } from "@aws-sdk/lib-storage";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DATABASE_URL, SEED_FILE, AWS_BUCKET_NAME } = process.env;

if (!DATABASE_URL || !SEED_FILE || !AWS_BUCKET_NAME) {
  console.error("❌ Missing environment variables.");
  process.exit(1);
}

async function uploadFileToS3(filePath, fileName) {
  const fileBuffer = await fs.promises.readFile(filePath);
  const mimeType = mime.lookup(fileName) || "application/octet-stream";

  const parallelUpload = new Upload({
    client: s3Client,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: `uploads-sportmarket/${fileName}`,
      Body: fileBuffer,
      ContentType: mimeType,
    },
  });

  const result = await parallelUpload.done();
  return result.Location;
}

(async () => {
  try {
    console.log("🚀 Executing SQL file...");
    const sql = await readFile(SEED_FILE, "utf-8");
    await pool.query(sql);

    // 1. First, create categories
    console.log("📂 Adding categories...");
    const categories = [
      {
        name: "Ropa deportiva",
        image: "ropa.jpg",
      },
      {
        name: "Articulos",
        image: "articulos.jpg",
      },
      {
        name: "Zapatillas",
        image: "zapatillas.jpg",
      },
    ];

    const categoryIds = {};

    for (const category of categories) {
      const localImagePath = path.join(
        __dirname,
        `../../assets/${category.image}`,
      );

      if (!fs.existsSync(localImagePath)) {
        console.error(`❌ Image not found: ${localImagePath}`);
        continue;
      }

      const s3Url = await uploadFileToS3(localImagePath, category.image);
      const categoryId = uuidv4();

      await pool.query(
        "INSERT INTO categories (id, name, image) VALUES ($1, $2, $3)",
        [categoryId, category.name, s3Url],
      );

      categoryIds[category.name] = categoryId;
    }

    // 2. Then, create users
    console.log("👥 Adding users...");
    const users = [
      { name: "Pedro Pascal", email: "test@test.com", password: "1234" },
      {
        name: "María González",
        email: "maria@example.com",
        password: "123456",
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        `INSERT INTO users (id, name, email, password) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (email) DO NOTHING`,
        [uuidv4(), user.name, user.email, hashedPassword],
      );
    }

    // 3. Finally, create products
    console.log("🛒 Adding products...");
    const products = [
      {
        title: "Camiseta de fútbol",
        description: "Camiseta oficial del equipo con tecnología transpirable.",
        price: 29000,
        category: "Ropa deportiva",
        image: "camiseta.webp",
      },
      {
        title: "Zapatillas de running",
        description: "Zapatillas ligeras con suela de amortiguación avanzada.",
        price: 69900,
        category: "Zapatillas",
        image: "zapatilla-running.webp",
      },
      {
        title: "Gorra deportiva",
        description: "Gorra ajustable ideal para entrenamientos al aire libre.",
        price: 14000,
        category: "Articulos",
        image: "gorra.webp",
      },
    ];

    for (const product of products) {
      const categoryId = categoryIds[product.category] || null;
      if (!categoryId) {
        console.warn(
          `⚠️ No category found for product: ${product.title}. Skipping...`,
        );
        continue;
      }

      const imageFilePath = path.join(
        __dirname,
        `../../assets/${product.image}`,
      );

      if (!fs.existsSync(imageFilePath)) {
        console.error(`❌ Product image not found: ${imageFilePath}`);
        continue;
      }

      const s3Url = await uploadFileToS3(imageFilePath, product.image);

      await pool.query(
        `INSERT INTO products 
        (id, title, description, price, category_id, image) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          uuidv4(),
          product.title,
          product.description,
          product.price,
          categoryId,
          s3Url,
        ],
      );
    }

    console.log("✅ Database seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding the database:", error.message);
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed.");
  }
})();
