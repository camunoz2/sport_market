import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  postProduct,
  getCategories,
  getProducts,
  getProductById,
  getProductsByCategoryId,
} from "../controllers/productController.js";
import testDBConnection from "../helpers/testDBConnection.js";
import upload from "../config/uploadConfig.js";
import { processPayment } from "../controllers/paymenController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/post", upload.single("image"), postProduct);
router.get("/categories", getCategories);
router.get("/categories/:id", getProductsByCategoryId);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/pay", processPayment);
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
