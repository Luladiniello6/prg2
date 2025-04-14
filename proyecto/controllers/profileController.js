const database = require('../db/db');

module.exports = {
	profile: (req, res) => {
        const usuario = database.usuario[0];
		res.render('profile', { usuario });
	}
};