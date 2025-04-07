import express from "express";
import CartController from "../controllers/cart.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";
import passport from "passport";
const router = express.Router();
const cartController = new CartController();

// Routes
router.post("/", cartController.createCart);
router.get("/:cid", cartController.getProductsInCart);
router.post("/:cid/product/:pid", passport.authenticate("current", {session: false}), authorization("user"), cartController.addProductInCart);
router.delete("/:cid/product/:pid", passport.authenticate("current", {session: false}), authorization("user"), cartController.deleteProductInCart);
router.put("/:cid", passport.authenticate("current", {session: false}), authorization("user"), cartController.updateProductsInCart);
router.put("/:cid/product/:pid", passport.authenticate("current", {session: false}), authorization("user"), cartController.updateQuantity);
router.delete("/:cid", passport.authenticate("current", {session: false}), authorization("user"), cartController.emptyCart);
router.post("/:cid/purchase", passport.authenticate("current", {session: false}), authorization("user"), cartController.checkout);

export default router;