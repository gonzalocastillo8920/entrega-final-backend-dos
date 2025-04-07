import ProductManager from "../dao/db/product.manager.js";
const productManager = new ProductManager();

class ProductRepository {

    async getAllProducts(query, sort, page = 1, limit = 10) {
        try {
            const products = await productManager.getAllProducts(query, sort, page, limit);
            return products;
        } catch (error) {
            throw new Error("error");
        };
    };

    async addProduct(prod) {
        try {
            const product = await productManager.addProduct(prod);
            return product;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async updateProduct(pid, newData) {
        try {
            const updatedProduct = await productManager.updateProduct(pid, newData);
            return updatedProduct;
        } catch (error) {
            throw new Error("Error"); 
        };
    };

    async getProductById(pid) {
        try {
            const product = await productManager.getProductById(pid);
            return product;
        } catch (error) {
            throw new Error("Error");
        };
    };

    async deleteProduct(pid) {
        try {
            const product = await productManager.deleteProduct(pid);
        } catch (error) {
            throw new Error("error");
        };
    };

}

export default new ProductRepository();