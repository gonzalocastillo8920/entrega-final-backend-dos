import { Router } from "express";
import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/utils.js";
import passport from "passport";
import CartManager from "../managers/cart.manager.js";

const router = Router();
const manager = new CartManager();

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: "Usuario no encontrado" });
        };
        if (!isValidPassword(password, user)) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        };

        const token = jwt.sign({ user: user, role: user.role }, "coderhouse", { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 3600000 });
        res.redirect("/api/sessions/current");

    } catch (error) {
        console.error("Error al realizar el login", error);
        res.status(500).send({ message: "Error interno del servidor", error });
    };
});

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        // Verificamos si ya esta registrado el correo:
        const existUser = await UserModel.findOne({ email: email });

        if (existUser) {
            return res.status(400).send({ message: "El correo ya esta registrado en nuestra DB" });
        };

        const newCart = await manager.crearCarrito();

        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role,
            cart: newCart._id
        });
        await newUser.save();
        res.redirect("/login");

    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor", error });
    };
});

router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
    if (req.user) {
        res.render("profile", { user: req.user.user });
    } else {
        res.send("No estas autorizado");
    };
});

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});

export default router;