import productDao from "../dao/product.dao.js";

class ProductService {

    async getAllPoducts(query, sort, page = 1, limit = 10) {
        try {
            const filter = query ? { $or: [{ category: query }, { stock: { $gt: 0 } }] } : {};
            const sortOrder = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
            const options = { page, limit, sort: sortOrder };

            return await productDao.getAllProducts(filter, options);
        } catch (error) {
            throw new Error("Error cargando todos los productos");
        };
    };

    async createProduct(data) {
        try {
            const product = await productDao.createProduct(data);
            if(!product) throw new Error("Error al crear el producto");
            return product;
        } catch (error) {
            throw error;
        };
    };

    async updateProduct(id, data) {
        try {
            const updatedProduct = await productDao.updateProduct(id, data);
            if (!updatedProduct) throw new Error("Error al actualizar el producto");
            return updatedProduct;
        } catch (error) {
            throw error;
        };
    };

    async getProductById(id) {
        try {
            const product = await productDao.getProductById(id);
            if (!product) throw new Error("No existe el producto con ese id, verifique");
        } catch (error) {
            throw error;
        };
    };

    async deleteProduct(id) {
        try {
            const deletedProduct = await productDao.deleteProduct(id);
            if(!deletedProduct) throw new Error("Error al intentar eliminar el producto");
            return deletedProduct;
        } catch (error) {
            throw error;
        };
    };

};

export default new ProductService();