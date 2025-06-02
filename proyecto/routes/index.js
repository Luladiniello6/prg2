var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController'); // ⬅️ Agregá esta línea

/* GET home page. */
router.get('/', indexController.home); // ⬅️ Usamos el controlador

module.exports = router;
