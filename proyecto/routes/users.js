const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Formulario de registro
router.get('/register', userController.register);

// Procesar el registro
router.post('/register', userController.registerUser);

// Formulario de login
router.get('/login', userController.login);

// Procesar login
router.post('/login', userController.loginProcess);

// Perfil del usuario
router.get('/perfil', userController.perfil);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
