const database = require('../db/models');

module.exports = {
	profile: (req, res) => {
        const usuario = database.usuario[0];
		res.render('profile', { usuario });
	}
};