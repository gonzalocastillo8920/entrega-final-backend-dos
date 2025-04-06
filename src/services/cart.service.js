import CartModel from "../dao/models/cart.model.js";

class CartService {
    async getElementsInCart(cid) {
        try {
            const cart = await CartModel.findById(cid);            
            if (!cart) throw new Error("No existe el carrito con ese id");
            return cart;
        } catch (error) {
            throw error;
        };
    };

    async createCart() {
        
    };

    async addProduct() {

    };

    async deleteProduct() {

    };

    async updateProductsInCart() {

    };

    async updateQuantitiesInCart() {

    };

    async emptyCart() {

    };
};

export default CartService;