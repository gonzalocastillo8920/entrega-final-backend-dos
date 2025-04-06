import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
const productController = new ProductController();
const router = Router();

// Routes
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.get("/pid", productController.getProductById);
router.delete("/:pid", productController.deleteProductById);

export default router;