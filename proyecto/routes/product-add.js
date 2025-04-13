const express = require('express');
const router = express.Router();
const productAddController = require('../controllers/product-addController')

router.get('/', productAddController.productAdd);

module.exports = router;
