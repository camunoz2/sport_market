import express from "express";
import multer from "multer";
import { login, register } from "../controllers/authController.js";
import {
  postProduct,
  getCategories,
  getProducts,
} from "../controllers/productController.js";
import testDBConnection from "../helpers/testDBConnection.js";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "src/data/uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/register", register);
router.post("/post", upload.single("image"), postProduct);
router.get("/categories", getCategories);
router.get("/products", getProducts);

router.get("/test-db", async (req, res) => {
  try {
    await testDBConnection();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});

export default router;
