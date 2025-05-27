const db = require('../db/models');
const bcrypt = require('bcryptjs');
const user = db.Usuario;

let registerController = {


  register: (req, res) => {
    if (req.session.userLogged) {
      return res.redirect('/perfil');
    }
    return res.render('register');
  },


  registerUser: function (req, res) {
    let username = req.body.nombreUsuario
    let email = req.body.email
    let password = req.body.contrasenia
    let nacimiento = req.body.nacimiento
    let dni = req.body.dni
    let passwordEncriptada = bcrypt.hashSync(contrasenia, 10);
    
    user.findOne({ where: { email: email } })
      .then(function(resultado){
      if(resultado){
        return res.send('ya existe el usuario');
      }
      if(password.length < 3){
        return res.send('la contraseña no puede tener menos de 3 caracteres');
      }



        user.create({
          nombreUsuario: nombreUsuario,
          email: email,
          contrasenia: passwordEncriptada,
          nacimiento: nacimiento,
          dni: dni,
          fotoPerfil: fotoPerfil || null
        })
          .then(newUser => {
            return res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            return res.send('Error al registrar el usuario.');
          });
      })
      .catch(error => {
        console.log(error);
        return res.send('Error en el servidor.');
      });
  },


  login: function (req, res) {
    if (req.session.userLogged) {
      return res.redirect('/perfil');
    }
    return res.render('login');
  },

  loginProcess: function (req, res) {
    let email = req.body.email
    let password = req.body.contrasenia
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
          res.cookie('userEmail', usuario.email, { maxAge: 1000 * 60 * 10});
        }

        return res.redirect('/perfil');
      })
      .catch(function(error) {
        return res.send(Error);
      });
  },


  perfil: function (req, res) {
    if (!req.session.userLogged) {
      return res.redirect('/login');
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

module.exports = registerController;
