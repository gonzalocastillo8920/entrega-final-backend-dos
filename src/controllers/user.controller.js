import userService from "../services/user.service.js";
import CartManager from "../dao/db/cart.manager.js";
import jwt from "jsonwebtoken";

const manager = new CartManager();

class UserController {

    async register(req, res) {
        try {
            const { first_name, last_name, email, age, password } = req.body;

            // Creo el carrito del nuevo usuario:
            const newCart = await manager.crearCarrito();

            const newUser = await userService.registerUser({
                first_name,
                last_name,
                email,
                age,
                password,
                cart: newCart._id
            });

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                role: newUser.role,
                cart: newUser.cart
            }, "coderhouse", { expiresIn: "1h" });
            
            res.cookie("coderCookieToken", token, { maxAge: 360000, httpOnly: true });
            res.redirect("/api/sessions/current");

        } catch (error) {
            res.status(500).send({ message: "Error interno del servidor", error });
        };
    }


    async login(req, res) {
        try {

            const { email, password } = req.body;
            
            const user = await userService.loginUser(email, password);

            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role,
                cart: user.cart
            }, "coderhouse", { expiresIn: "1h" });

            res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 3600000 });
            res.redirect("/api/sessions/current");

        } catch (error) {
            console.error("Error al realizar el login", error);
            res.status(500).send({ message: "Error interno del servidor", error });
        };
    };

    async current(req, res) {
        if (req.user) {
            const user = req.user;
            res.render("profile", { user: user });
        } else {
            res.send("No estas autorizado");
        };
    };

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    };
};

export default UserController;