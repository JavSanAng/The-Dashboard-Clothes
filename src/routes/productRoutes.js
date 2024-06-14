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
router.get('/dashboard', showProducts);
router.get('/dashboard/new', showNewProduct);
router.get('/dashboard/products/:productId', showProductById);
router.get('/dashboard/products/:productId/edit', showEditProduct);
router.put('/dashboard/:productId',updateProduct);
router.delete('/dashboard/products/:productId/delete', deleteProduct);

module.exports = router;