const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');
const upload = require('../config/upload');


router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getProducts);
router.post('/', auth, upload.single('image'), productController.createProduct);

module.exports = router;
