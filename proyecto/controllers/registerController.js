const db = require('../db/database');
const bcrypt = require('bcryptjs');

const registerController = {
  register: (req, res) => {
    res.render('register');
  },

  processRegister: (req, res) => {
    const { email, password, nacimiento, dni, foto } = req.body;

    // Encriptar la contraseña
    const passwordHashed = bcrypt.hashSync(password, 10);

    const sql = `INSERT INTO usuarios (email, contrasenia, nacimiento, dni, fotoPerfil) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [email, passwordHashed, nacimiento, dni, foto], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.send('Error en el registro');
      }

      res.redirect('/login'); // o podés redirigir a /profile si querés
    });
  }
};

module.exports = registerController;