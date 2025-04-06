class ExtProdDao {

    async getAllProducts() {
        return await ProductModel.find({});
    }

    async createProduct(prod) {
        return await ProductModel.create(prod);
    };

    async getProductById(pid) {
        return await ProductModel.findById(pid);
    };

    async updateProduct(pid, prod) {
        return await ProductModel.findByIdAndUpdate(pid, prod, {new: true});
    };

    async deleteProduct(pid) {
        return await ProductModel.findByIdAndDelete(pid);
    };
};

export default ExtProdDao;