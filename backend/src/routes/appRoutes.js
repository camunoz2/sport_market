import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  postProduct,
  getCategories,
  getProducts,
  getProductById,
  getProductsByCategoryId,
  getOrders,
  getUserByProductId,
  getProductsByUserId,
  testDB,
  deleteProductById,
  editProductsById,
} from "../controllers/productController.js";
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
router.get("/products/:id/user", getUserByProductId);
router.delete("/products/:id", deleteProductById);
router.patch("/products/:id", editProductsById);
router.get("/users/:id/products", getProductsByUserId);
router.post("/pay", processPayment);
router.get("/orders/:userId", getOrders);
router.get("/test-db", testDB);

export default router;
