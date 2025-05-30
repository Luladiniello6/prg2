const db = require('../db/models');
const bcrypt = require('bcryptjs');
const user = db.Usuario;

let userController = {

  // Renderiza el formulario de registro
  register: (req, res) => {
    if (req.session.userLogged) {
      return res.redirect('/users/perfil');
    }
    return res.render('register');
  },

  // Procesa el registro de un nuevo usuario
  registerUser: function (req, res) {
    let nombreUsuario = req.body.nombreUsuario;
    let email = req.body.email;
    let contrasenia = req.body.contrasenia;
    let nacimiento = req.body.nacimiento;
    let dni = req.body.dni;
    let fotoPerfil = req.body.fotoPerfil;

    // Validación básica
    if (!nombreUsuario || !email || !contrasenia || !nacimiento || !dni) {
      return res.send('Faltan datos obligatorios');
    }

    if (contrasenia.length < 3) {
      return res.send('La contraseña no puede tener menos de 3 caracteres');
    }

    let passwordEncriptada = bcrypt.hashSync(contrasenia, 10);

    user.findOne({ where: { email: email } })
      .then(function (resultado) {
        if (resultado) {
          return res.send('Ya existe un usuario con ese email');
        }

        return user.create({
          nombreUsuario:nombreUsuario,
          email:email,
          contrasenia: passwordEncriptada,
          nacimiento:nacimiento,
          dni:dni,
          fotoPerfil:foto,
        });
      })
      .then(newUser => {
        if (newUser) {
          return res.redirect('/users/login');
        }
      })
      .catch(err => {
          console.error('Error al registrar usuario:', err);
        return res.send('Error en el servidor al registrar el usuario.');
      });
  },

  // Renderiza el formulario de login
  login: function (req, res) {
    if (req.session.userLogged) {
      return res.redirect('/users/perfil');
    }
    return res.render('login');
  },

  // Procesa el login
  loginProcess: function (req, res) {
    let email = req.body.email;
    let contrasenia = req.body.contrasenia;
    let recordarme = req.body.tyc;

    user.findOne({ where: { email: email } })
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
          email: usuario.email,
          fotoPerfil: usuario.fotoPerfil
        };

        if (recordarme) {
          res.cookie('userEmail', usuario.email, { maxAge: 1000 * 60 * 10 });
        }

        return res.redirect('/users/perfil');
      })
      .catch(function (error) {
        console.log(error);
        return res.send('Error del servidor en login.');
      });
  },

  // Muestra el perfil del usuario
  perfil: function (req, res) {
    if (!req.session.userLogged) {
      return res.redirect('/users/login');
    }
    return res.render('profile', {
      user: req.session.userLogged
    });
  },

  // Cierra la sesión
  logout: function (req, res) {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  }
};

module.exports = userController;
