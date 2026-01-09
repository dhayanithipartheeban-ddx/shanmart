const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const reportController = require('../controllers/report.controller');

router.get('/today', auth, reportController.todaySales);
router.get('/month', auth, reportController.monthSales);

module.exports = router;
