const database = require('../db/db');

module.exports = {
	product: (req, res) => {
        const comentarios = database.comentarios;
		res.render('product', { comentarios });
	}
};