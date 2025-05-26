const database = require('../db/database');

module.exports = {
	profile: (req, res) => {
        const usuario = database.usuario[0];
		res.render('profile', { usuario });
	}
};