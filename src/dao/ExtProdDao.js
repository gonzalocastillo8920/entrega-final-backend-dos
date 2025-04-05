class ExtProdDao {

    async getAllProducts() {
        return await ProductModel.find({});
    }

    async createProduct(data) {
        return await ProductModel.create(data);
    };

    async getProductById(id) {
        return await ProductModel.findById(id);
    };

    async updateProduct(id, data) {
        return await ProductModel.findByIdAndUpdate(id, data, {new: true});
    };

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    };
};

export default ExtProdDao;