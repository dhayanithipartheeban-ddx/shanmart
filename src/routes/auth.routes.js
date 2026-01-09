const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getProducts);

module.exports = router;
