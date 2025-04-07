import ProductRepository from "../repositories/product.repository.js";

class ProductController {

    async addProduct(req, res) {
        try {
            const newProduct = req.body;
            const result = await ProductRepository.addProduct(newProduct);
            res.status(200).json({
                mensaje: "Producto creado satisfactoriamente",
                payload: result
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async getAllProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;
            const products = await ProductRepository.getAllProducts(limit, page, sort, query);
            res.json(products);
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };

    async getProductById(req, res) {
        try {
            const pid = req.params.pid;
            const product = await ProductRepository.getProductById(pid);

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


    async updateProduct(req, res) {
        try {
            const pid = req.params;
            const updatedProduct = req.body;
            const result = await ProductRepository.updateProduct(pid, updatedProduct);
            res.status(200).json({
                mensaje: "Producto actualizado con exito",
                payload: result
            });
        } catch (error) {
            res.status(500).json({ mensaje: "Error en Servidor/DB.", error });
        };
    };


    async deleteProductById(req, res) {
        try {
            const pid = req.params;
            const deletedProduct = await ProductRepository.deleteProduct(pid);
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