const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const salesController = require('../controllers/sales.controller');

router.post('/', auth, salesController.createSale);
router.get('/', auth, salesController.getSales);

module.exports = router;
