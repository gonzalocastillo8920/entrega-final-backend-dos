import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";
const userController = new UserController();
const router = Router();

router.post("/login", userController.login);
router.post("/register", userController.register)
router.get("/current", passport.authenticate("current", {session: false}), userController.current);
router.post("/logout", userController.logout);

export default router;