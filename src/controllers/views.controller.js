import ProductModel from "../dao/models/product.model.js";
import CartService from "../services/cart.service.js";
const cartService = new CartService();

class ViewsController {
    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 3 } = req.query;

            const skip = (page - 1) * limit;

            const products = await ProductModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            res.render("products", {
                products: products,
                hasPrevPage,
                hasNextPage,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                currentPage: parseInt(page),
                totalPages
            });

        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async renderCart(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await cartService.getElementsInCart(cartId);

            if (!cart) throw new Error("No existe carrito con ese id");

            let Amount = 0;

            const totalProducts = cart.products.map(item => {
                const product = item.product.toObject();
                const quantity = item.quantity;
                const totalPrice = product.price * quantity;

                Amount += totalPrice;

                return {
                    product: { ...product, totalPrice },
                    quantity,
                    cartId
                };
            });

            res.render("carts", { products: totalProducts, Amount, cartId });

        } catch (error) {
            throw error;
        };
    };

    async renderLogin(req, res) {
        res.dender("login");
    };

    async renderRegister(req, res) {
        res.render("register");
    };

    async renderRealTimeProducts(req, res) {
        try {
            res.render("realtimeproducts");
        } catch (error) {
            res.status(500).json({error: "Error interno del servidor"});
        };
    };

    async renderHome(req, res) {
        res.dender("home");
    };
};


export default ViewsController;