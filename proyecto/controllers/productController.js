const database = require('../db/models');

module.exports = {
	product: (req, res) => {
        const comentarios = database.comentarios;
		res.render('product', { comentarios });
	}
};