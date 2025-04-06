import ProductService from "../services/product.service.js";

class ProductController {

    async getAllProducts(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            const products = await ProductService.getAllProducts({
                limit: limit,
                page: page,
                sort,
                query
            });

            res.status(200).json({
                status: "success",
                payload: products,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async createProduct(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(200).json({ mensaje: "Producto creado satisfactoriamente", payload: newProduct });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async updateProduct(req, res) {
        try {
            const pid = req.params;
            const updatedProduct = await ProductService.updateProduct(pid, req.body);
            res.status(200).json({ mensaje: "Producto actualizado con exito", payload: updatedProduct });

        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async getProductById(req, res) {
        try {
            const pid = req.params;
            const product = await ProductService.getProductById(pid);

            if (!product) {
                return res.status(404).json({ mensaje: "No pudimos encontrar ese producto, verifique" });
            };
            res.status(200).json({
                mensaje: "Producto encontrado!",
                payload: product
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async deleteProductById(req, res) {
        try {
            const pid= req.params;
            const deletedProduct = await ProductService.deleteProduct(pid);
            res.status(200).json({
                mensaje: "Producto borrado exitosamente!",
                payload: deletedProduct
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };
};

export default ProductController;