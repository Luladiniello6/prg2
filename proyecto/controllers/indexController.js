const db = require('../db/models');

const indexController = {
	home: (req, res) => {
		db.Producto.findAll({
			include: [{ model: db.Comentario, as: 'comentarios' }]
		})
		.then(productos => {
			res.render('index', { productos });
		})
		.catch(error => {
			console.error('Error al cargar productos:', error);
			res.send('Error en el servidor');
		});
	}
};

module.exports = indexController;
