import express from "express";
import CartController from "../controllers/cart.controller.js";
const router = express.Router();
const cartController = new CartController();

// Routes
router.post("/", cartController.createCart);
router.get("/:cid", cartController.getProductsInCart);
router.post("/:cid/product/:pid", cartController.addProductInCart);
router.delete("/:cid/product/:pid", cartController.deleteProductInCart);
router.put("/:cid", cartController.updateProductsInCart);
router.put("/:cid/product/:pid", cartController.updateQuantity);
router.delete("/:cid", cartController.emptyCart);
router.post("/:cid/purchase", cartController.checkout);

export default router;