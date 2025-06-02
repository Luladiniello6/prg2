const db = require('../db/models');
const bcrypt = require('bcryptjs');
const user = db.Usuario;

let userController = {

  register: function (req, res) {
    if (req.session.userLogged) {
      return res.redirect('/users/perfil');
    } else {
      return res.render('register');
    }
  },

  registerUser: function (req, res) {
    let { nombreUsuario, email, contrasenia, nacimiento, dni } = req.body;

    if (!Date.parse(nacimiento)) {
      return res.send('La fecha de nacimiento no es válida.');
    }

    if (contrasenia.length < 3) {
      return res.send('La contraseña no puede tener menos de 3 caracteres');
    }

    let passwordEncriptada = bcrypt.hashSync(contrasenia, 10);

    user.findOne({ where: { email } })
      .then(resultado => {
        if (resultado) {
          return res.send('Ya existe un usuario con ese email');
        }

        return user.create({
          nombreUsuario,
          email,
          contrasenia: passwordEncriptada,
          nacimiento,
          dni: parseInt(dni)
        });
      })
      .then(nuevoUsuario => {
        if (nuevoUsuario) {
          return res.redirect('/users/login');
        }
      })
      .catch(err => {
        console.error('Error al registrar usuario:', err.message);
        console.error(err);
        return res.send('Error en el servidor al registrar el usuario.');
      });
  },

  login: function (req, res) {
    if (req.session.userLogged) {
      return res.redirect('/users/perfil');
    }
    return res.render('login');
  },

  loginProcess: function (req, res) {
    let { email, contrasenia } = req.body;
    let recordarme = req.body.tyc;

    user.findOne({ where: { email } })
      .then(usuario => {
        if (!usuario) {
          return res.send('El email no está registrado.');
        }

        if (!bcrypt.compareSync(contrasenia, usuario.contrasenia)) {
          return res.send('La contraseña es incorrecta.');
        }

        req.session.userLogged = {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email
        };

        if (recordarme) {
          res.cookie('userEmail', usuario.email, { maxAge: 1000 * 60 * 10 });
        }

        return res.redirect('/users/perfil');
      })
      .catch(error => {
        console.log(error);
        return res.send('Error del servidor en login.');
      });
  },

  perfil: function (req, res) {
    if (!req.session.userLogged) {
      return res.redirect('/users/login');
    }
    return res.render('profile', {
      user: req.session.userLogged
    });
  },

  logout: function (req, res) {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  }
};

module.exports = userController;
