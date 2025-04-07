import ProductManager from "../dao/db/product.manager.js";
import CartRepository from "../repositories/cart.repository.js";
const productManager = new ProductManager();
const cartRepository = new CartRepository();

class ViewsController {
    async renderProducts(req, res) {

        try {
            const { page = 1, limit = 3 } = req.query;
            const products = await productManager.getAllProducts({
                page: parseInt(page),
                limit: parseInt(limit)
            });

            const allProducts = products.docs.map(product => {
                const { id: _id, ...rest } = product.toObject();
                return rest;
            });

            res.render("products", {
                productos: allProducts,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages
            });

        } catch (error) {
            throw error;
        };
    };

    async renderCart(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartRepository.getCartById(cid);
            if (!cart) throw new Error("Error al buscar carrito con ese id");

            let Amount = 0;

            const totalProducts = cart.products.map(item => {
                const product = item.product.toObject();
                const quantity = item.quantity;
                const totalPrice = product.price * quantity;

                Amount += totalPrice;

                return {
                    product: { ...product, totalPrice },
                    quantity,
                    cid
                };
            });

            res.render("carts", { products: totalProducts, Amount, cid });

        } catch (error) {
            throw error;
        };
    };

    async renderLogin(req, res) {
        res.render("login");
    };

    async renderRegister(req, res) {
        res.render("register");
    };

    async renderRealTimeProducts(req, res) {
        try {
            res.render("realtimeproducts");
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        };
    };

    async renderHome(req, res) {
        res.render("products");
    };
};


export default ViewsController;