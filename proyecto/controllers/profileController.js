const db = require('../db/db')

const profileController = {
    profile: function (req, res) {
        const usuario = db.usuario
        res.render('profile', {usuario});
    }
}

module.exports = profileController