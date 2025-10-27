const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error getting products', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getProductById(id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error getting product', error: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await productModel.updateProduct(id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, message: 'Product updated', data: { id, ...req.body } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await productModel.deleteProduct(id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const productId = await productModel.createProduct(req.body);
        res.status(201).json({success: true, message: 'Product created', data: { id: productId, ...req.body}});
    } catch (eror) {
        res.status(500).json({ success: false, message: 'Eror creating product', eror: eror.message});
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
};