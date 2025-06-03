const db = require('../db/models');
const bcrypt = require('bcryptjs');
const user = db.Usuario;

const userController = {

  register: function (req, res) {
    if (req.session.userLogged) {
      return res.redirect('/users/perfil');
    }
    return res.render('register');
  },

  registerUser: function (req, res) {
    let { nombreUsuario, email, contrasenia, nacimiento, dni } = req.body;

    if (contrasenia.length < 3) {
      return res.send('La contraseña no puede tener menos de 3 caracteres');
    }

    const passwordEncriptada = bcrypt.hashSync(contrasenia, 10);

    user.findOne({ where: { email: email } })
      .then(resultado => {
        if (resultado) {
          return res.send('Ya existe un usuario con ese email');
        }

        return user.create({
          nombreUsuario,
          email,
          contrasenia: passwordEncriptada,
          nacimiento,
          dni
        });
      })
      .then(nuevoUsuario => {
        if (nuevoUsuario) {
          return res.redirect('/users/login');
        }
      })
      .catch(err => {
        console.error('Error al registrar usuario:', err);
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
    const { email, contrasenia, tyc } = req.body;

    user.findOne({ where: { email: email } })
      .then(usuario => {
        if (!usuario) {
          return res.send('El email no está registrado.');
        }

        const passwordOk = bcrypt.compareSync(contrasenia, usuario.contrasenia);
        if (!passwordOk) {
          return res.send('La contraseña es incorrecta.');
        }

        req.session.userLogged = {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          fotoPerfil: usuario.fotoPerfil
        };

        if (tyc) {
          res.cookie('userEmail', usuario.email, { maxAge: 1000 * 60 * 10 });
        }

        return res.redirect('/users/perfil');
      })
      .catch(error => {
        console.error('Error del servidor en login:', error);
        return res.send('Error del servidor en login.');
      });
  },

  perfil: function (req, res) {
    if (!req.session.userLogged) {
      return res.redirect('/users/login');
    }

    const id = req.session.userLogged.id;

    db.Usuario.findByPk(id, {
      include: [
        {
          model: db.Producto,
          as: 'productos',
          include: [{ model: db.Comentario, as: 'comentarios' }]
        },
        {
          model: db.Comentario,
          as: 'comentarios',
          include: [{ model: db.Producto, as: 'producto' }]
        }
      ]
    })
      .then(usuario => {
        if (!usuario) {
          return res.send("Usuario no encontrado.");
        }

        return res.render('profile', {
          user: usuario,
          productos: usuario.productos
        });
      })
      .catch(error => {
        console.error("Error al cargar perfil:", error);
        return res.send("Error al cargar el perfil.");
      });
  },

  perfiles: function (req, res) {
    const id = req.params.id;

    db.Usuario.findByPk(id, {
      include: [
        {
          model: db.Producto,
          as: 'productos',
          include: [{ model: db.Comentario, as: 'comentarios' }]
        },
        {
          model: db.Comentario,
          as: 'comentarios',
          include: [{ model: db.Producto, as: 'producto' }]
        }
      ]
    })
      .then(usuario => {
        if (!usuario) {
          return res.send("Usuario no encontrado.");
        }

        return res.render('profile', {
          user: usuario,
          productos: usuario.productos
        });
      })
      .catch(error => {
        console.error("Error al cargar perfil ajeno:", error);
        return res.send("Error al cargar el perfil.");
      });
  },

  logout: function (req, res) {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  }

};

module.exports = userController;
