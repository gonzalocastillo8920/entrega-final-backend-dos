import ProductModel from "../models/product.model.js"

class ProductManager {

    // Metodo para obtener Todos los Productos:
    async getAllProducts({ limit = 10, page = 1, sort, query } = {}) {

        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};
            if (query) {
                queryOptions = { category: query };
            };

            const sortOptions = {};
            if (sort) {
                if (sort === "asc" || sort === "desc") {
                    sortOptions.price = sort === "asc" ? 1 : -1;
                };
            };

            const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };

        } catch (error) {
            throw error;
        };
    };

    // Metodo para Agregar un Producto:
    async addProduct({ code, title, price, category, thumbnails, stock, description, status }) {

        try {

            if (!code || !title || !description || !price || !stock || !category || status) {
                console.log("Todos los campos son obligatorios!");
                return;
            };

            const product = await ProductModel.findOne({ code: code });

            if (product) {
                console.log("El codigo del producto ya existe!");
                return;
            };

            const newProduct = new ProductModel({
                code,
                title,
                price,
                category,
                thumbnails: thumbnails || [],
                stock,
                description,
                status: true
            });

            await newProduct.save();
            return newProduct;

        } catch (error) {
            throw error;
        };
    };

    // Metodo para Obtener un Producto por ID:
    async getProductById(pid) {
        try {
            const product = await ProductModel.findById(pid);
            if (!product) return null;
            return product;
        } catch (error) {
            throw error;
        };
    };

    // Metodo para Actualizar un Producto:
    async updateProduct(pid, newData) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(pid, newData);
            if (!updatedProduct) return null;
            return updatedProduct;
        } catch (error) {
            throw error;
        };
    };

    // Metodo para eliminar un producto por ID:
    async deleteProduct(pid) {
        try {
            const product = await ProductModel.findByIdAndDelete(pid);
            if (!product) return null;
            return product;
        } catch (error) {
            throw error;
        };
    };
};

export default ProductManager;