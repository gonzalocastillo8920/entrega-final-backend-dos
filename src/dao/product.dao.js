import ProductModel from "./models/product.model.js";
import ExtProdDao from "./ExtProdDao.js";
const productModel = new ProductModel();

class ProductDao extends ExtProdDao {

    async getAllProducts(filter = {}, options = {}) {
        try {
            const products = await productModel.paginate(filter, options);
            return products;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default new ProductDao();