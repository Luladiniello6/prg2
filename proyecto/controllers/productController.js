const database = require('../db/database');

module.exports = {
	product: (req, res) => {
        const comentarios = database.comentarios;
		res.render('product', { comentarios });
	}
};