import CartModel from "../dao/models/cart.model.js";

class CartRepository {
    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async getProductsInCart(cid) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) throw new Error("No existe ese carrito con el id especificado, verifique");
            return cart;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async addProductInCart(cid, pid, quantity = 1) {
        try {
            const cart = await this.getProductsInCart(cid);
            const product = cart.products.find(item => item.product._id.toString() === pid);

            if (product) {
                product.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            };

            cart.markModified("products");
            await cart.save();
            return cart;

        } catch (error) {
            throw new Error("Error");
        };
    };

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = cart.products.filter(item => item.product._id.toString() !== pid);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async updateProductsInCart(cid, updatedProducts) {
        try {
            const cart = await CartModel.findById(cid);

            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = updatedProducts;

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async updateQuantity(cid, pid, newQuantity) {
        try {
            const cart = await CartModel.findById(cid);

            if (!cart) throw new Error("Carrito no encontrado");

            const productIndex = cart.products.findIndex(item => item._id.toString() === pid);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity

                cart.markModified("products");
                await cart.save();
                return cart;
            } else {
                throw new Error("Producto no encontrado en el carrito");
            };
        } catch (error) {
            throw new Error("Error");
        };
    };

    async emptyCart(cid) {
        try {
            const cart = await CartModel.findByIdAndUpdate(cid, {products: []}, {new: true});

            if (!cart) throw new Error("Carrito no encontrado");
            
            return cart;
        } catch (error) {
            throw new Error("Error");
        };
    };
};

export default CartRepository;