import { readFile } from "fs/promises";
import pool from "../config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import s3Client from "./aws.js";
import mime from "mime-types";
import { Upload } from "@aws-sdk/lib-storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DATABASE_URL, SEED_FILE, AWS_BUCKET_NAME } = process.env;

if (!DATABASE_URL || !SEED_FILE || !AWS_BUCKET_NAME) {
  console.error(
    "DATABASE_URL or SEED_FILE or AWS_BUCKET_NAME environment variable is missing.",
  );
  process.exit(1);
}

async function uploadFileToS3(filePath, fileName) {
  const fileBuffer = await fs.promises.readFile(filePath);
  const mimeType = mime.lookup(fileName) || "application/octect-stream";

  const parallelUpload = new Upload({
    client: s3Client,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: `uploads-sportmarket/${fileName}`,
      Body: fileBuffer,
      ContentType: mimeType,
    },
  });

  parallelUpload.on("httpUploadProgress", (progress) => {
    console.log("Upload progress:", progress);
  });

  const result = await parallelUpload.done();
  return result.Location;
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
    const localImagePath = path.join(__dirname, "../../assets/notfound.png");

    for (let i = 1; i <= 10; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const uniqueFilename = `${Date.now()}-${i}.png`;

      const s3Url = await uploadFileToS3(localImagePath, uniqueFilename);

      await pool.query(
        "INSERT INTO products (id, title, description, price, category, image) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          uuidv4(),
          `Product ${i}`,
          `Description for product ${i}`,
          (Math.random() * 100).toFixed(2),
          category.name,
          s3Url,
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
