import express from "express";
import multer from "multer";
import { login, register } from "../controllers/authController.js";
import {
  postProduct,
  getCategories,
  getProducts,
} from "../controllers/productController.js";
import testDBConnection from "../helpers/testDBConnection.js";

const router = express.Router();
const upload = multer();

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
