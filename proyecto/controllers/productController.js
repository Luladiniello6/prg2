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
	}
};

module.exports = productController;
