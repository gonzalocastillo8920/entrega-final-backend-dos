import CartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js";
import UserDao from "../dao/user.dao.js";
import TicketModel from "../dao/models/ticket.model.js";
import { ramdomCode, totalAmount } from "../utils/cart.utils.js";
const cartRepository = new CartRepository();

class CartController {
    async createCart(req, res) {
        try {
            const newCart = await cartRepository.createCart();
            res.json(newCart);
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async getProductsInCart(req, res) {
        try {
            const cid = req.params.cid;
            const products = await cartRepository.getProductsInCart(cid);

            if(!products) return res(404).json({mensaje: "No se encuentra carrito"});

            res.json(products);
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async addProductInCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity || 1;

            await cartRepository.addProductInCart(cid, pid, quantity);
            const cartId = (req.user.cart).toString();

            res.redirect(`/carts/${cartId}`);
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async deleteProductInCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;

            const updatedCart = await cartRepository.deleteProductInCart(cid, pid);
            res.json({
                status: "success",
                mesnsaje: "Producto eliminado del carrito con exito",
                updatedCart,
            });
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        }
    };

    async updateProductsInCart(req, res) {
        try {
            const cid = req.params.cid;
            const updatedProducts = req.body;

            const updatedCart = await cartRepository.updateProductsInCart(cid, updatedProducts);
            res.json(updatedCart);
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async updateQuantity(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const newQuantity = req.body.quantity;

            const updatedCart = await cartRepository.updateQuantity(cid, pid, newQuantity);

            res.json({
                status: "success",
                mensaje: "Cantidades del producto actualizadas!",
                updatedCart,
            });
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async emptyCart(req, res) {
        try {
            const cid = req.params.cid;

            const updatedCart = await cartRepository.emptyCart(cid);

            res.json({
                status: "success",
                mensaje: "Carrito vaciado correctamente",
                updatedCart,
            });
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };

    async checkout(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartRepository.getCartById(cid);
            if(cart.products.length === 0) return res.status(400).json({mensaje: "Carrito Vacio"});
            const products = cart.products;

            const productsWoStock = []; // productos sin stock

            for(const item of products) {
                const pid = item.product;
                const product = await productRepository.getProductById(pid);
                if(product.stock >= item.quantity) {
                    // si hay suficiente stock, restar la cantidad de producto y guardar el carrito para calcular Amount
                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    // si no hay suficiente stock, agregar el id del producto al array de productos no disponibles
                    productsWoStock.push(pid);
                };
            };

            const userWithCart = await UserDao.findOne({cart: cid});

            // Crear ticket con los datos de la compra:
            const ticket = new TicketModel({
                code: ramdomCode(),
                purchase_datetime: new Date(),
                amount: totalAmount(cart.products),
                purchaser: userWithCart.email
            });
            await ticket.save();

            // eliminar los productos que si se compraron
            cart.products = cart.products.filter(item => productsWoStock.some(pid => pid.equals(item.product)));

            // Guardar el carrito actualizado en DB
            await cart.save();

            res.status(200).json({ productsWoStock });
        } catch (error) {
            res.satus(500).json({mensaje: "Error interno del servidor"});
        };
    };
}

export default CartController;