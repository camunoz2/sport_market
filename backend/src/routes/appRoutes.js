import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  postProduct,
  getCategories,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/post", postProduct);
router.get("/categories", getCategories);

export default router;
