const express = require('express');
const router = express.Router();
const registerController = require('../controllers/userController');

router.get('/login', registerController.login);
router.post('/login', registerController.loginProcess);
router.get('/perfil', registerController.perfil);
router.get('/logout', registerController.logout);

module.exports = router;
