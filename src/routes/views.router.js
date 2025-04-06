import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";
import passport from "passport";
const router = Router();
const viewsController = new ViewsController();

// Routes
router.get("/products", passport.authenticate("current", {session: false}), viewsController.renderProducts);
router.get("/carts/:cid", viewsController.renderCart);
router.get("/realTimeProducts", passport.authenticate("current", {session: false}), viewsController.renderRealTimeProducts);
router.get("/register", viewsController.renderRegister);
router.get("/login", viewsController.renderLogin);
router.get("/", viewsController.renderHome);

export default router;