const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/product-add', productController.addForm)

router.get('/:id', productController.detalle);

router.post('/product-add', productController.addProduct);

module.exports = router;
