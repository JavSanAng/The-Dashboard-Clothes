const express = require('express')
const router = express.Router();
const Product = require('../models/Product')

const {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

router.get('/products',showProducts );
router.get('/products/:productId',showProductById );
router.post('/dashboard', createProduct);
router.get('/dashboard/new', showNewProduct);
router.get('/dashboard/products/:_id', showProductById);
router.get('/dashboard/products/:_id/edit', showEditProduct);
router.post('/dashboard/products/:_id',updateProduct);
router.post('/dashboard/products/:_id/delete', deleteProduct);

module.exports = router;