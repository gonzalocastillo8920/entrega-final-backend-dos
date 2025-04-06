import ProductManager from "../dao/db/product.manager.js";
import CartService from "../services/cart.service.js";
const cartService = new CartService();
const productManager = new ProductManager();

class ViewsController {
    async renderProducts(req, res) {

        try {
            const { page = 1, limit = 3 } = req.query;
            const productos = await productManager.obtenerProductos({
                page: parseInt(page),
                limit: parseInt(limit)
            });

            const todosProductos = productos.docs.map(producto => {
                const { _id, ...rest } = producto.toObject();
                return rest;
            });

            res.render("products", {
                productos: todosProductos,
                hasPrevPage: productos.hasPrevPage,
                hasNextPage: productos.hasNextPage,
                prevPage: productos.prevPage,
                nextPage: productos.nextPage,
                currentPage: productos.page,
                totalPages: productos.totalPages
            });

        } catch (error) {
            console.log("Error al obtener los productos. " + error);
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async renderCart(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartService.getElementsInCart(cid);
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