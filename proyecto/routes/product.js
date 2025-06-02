const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/buscar', productController.product);

module.exports = router;
