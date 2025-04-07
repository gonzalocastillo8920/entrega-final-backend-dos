import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";
import passport from "passport";
const productController = new ProductController();
const router = Router();

// Routes
router.get("/", productController.getAllProducts);
router.get("/pid", productController.getProductById);
router.post("/", passport.authenticate("current", {session: false}), authorization("admin"), productController.addProduct);
router.put("/:pid", passport.authenticate("current", {session: false}), authorization("admin"), productController.updateProduct);
router.delete("/:pid",passport.authenticate("current", {session: false}), authorization("admin"), productController.deleteProductById);

export default router;