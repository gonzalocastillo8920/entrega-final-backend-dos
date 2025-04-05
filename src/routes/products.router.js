import { Router } from "express";
// import ProductManager from "../dao/models/product.model.js";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController();

const router = Router();
// const manager = new ProductManager();

// mostrar Productos:
router.get("/", productController.getAllProducts);
// Agregar un Producto Nuevo: 
router.post("/", productController.createProduct);
// Actualizar Producto por ID:
router.put("/:pid", productController.updateProduct);
// Buscar un Producto por su ID:
router.get("/pid", productController.getProductById);
// Eliminar un Producto:
router.delete("/:pid", productController.deleteProductById);


export default router;