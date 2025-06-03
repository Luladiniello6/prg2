const db = require('../db/models');
const Op = db.Sequelize.Op;

const productController = {
	product: (req, res) => {
		db.Comentario.findAll()
			.then(comentarios => {
				res.render('product', { comentarios });
			})
			.catch(err => {
				console.error('Error al cargar comentarios:', err);
				res.send('Error en el servidor');
			});
	},

	busqueda: (req, res) => {
		let search = req.query.search;

		db.Producto.findAll({
			where: {
				nombreProducto: {
					[Op.like]: `%${search}%`
				}
			},
			include: [
				{ model: db.Usuario, as: "usuario" },
				{ model: db.Comentario, as: "comentarios" }
			]
		})
			.then(productos => {
				if (productos.length === 0) {
					res.render("search-results", {
						productos: [],
						mensaje: "No hay resultados para su criterio de búsqueda"
					});
				} else {
					res.render("search-results", {
						productos,
						mensaje: null
					});
				}
			})
			.catch(error => {
				console.error("Error al buscar productos:", error);
				res.send("Error al realizar la búsqueda.");
			});
	},

	perfil: function (req, res) {
		if (!req.session.userLogged) {
			return res.redirect('/users/login');
		}

		db.Usuario.findByPk(req.session.userLogged.id, {
			include: [{ model: db.Producto, as: 'productos' }]
		})
			.then(usuario => {
				if (!usuario) return res.redirect('/users/login');

				return res.render('profile', {
					user: usuario,
					productos: usuario.productos
				});
			})
			.catch(error => {
				console.log("Error al cargar perfil:", error);
				return res.send("Error al cargar perfil");
			});
	},

	detalle: function (req, res) {
	const id = req.params.id;

	db.Producto.findByPk(id, {
		include: [
			{ model: db.Usuario, as: 'usuario' },
			{
				model: db.Comentario,
				as: 'comentarios',
				include: [{ model: db.Usuario, as: 'usuario' }] 
			}
		]
	})
	.then(producto => {
		if (!producto) {
			return res.send("Producto no encontrado.");
		}

		return res.render('product', { producto }); 
	})
	.catch(error => {
		console.error("Error al cargar producto:", error);
		return res.send("Error al cargar el producto.");
	});
},
	addForm: function(req, res){
		res.render('product-add')
	},

	  addProduct: function (req, res) {
    if (!req.session.userLogged) {
      return res.redirect('/users/login');
    }

    const imagen = "/images/products/" + req.body.myfile;
    const nombreProducto = req.body.name; 
    const descripcion = req.body.description; 
    const idUsuario = req.session.userLogged.id;

    db.Producto.create({
      usuarioId: idUsuario,
      nombreImagen: imagen,
      nombreProducto: nombreProducto,
      descripcion: descripcion
    })
      .then(() => {
        return res.redirect('/users/perfil');
      })
      .catch(error => {
        console.error("Error al crear el producto:", error);
        return res.send("Error al crear el producto");
      });
  }
}


module.exports = productController;
