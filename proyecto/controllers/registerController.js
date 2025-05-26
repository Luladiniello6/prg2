
const db = require('../db/database');
const bcrypt = require('bcryptjs');

const registerController = {

  register: (req, res) => {
    res.render('register');
  },

  registerUser: function(req, res){
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let nacimiento = req.body.password
    let dni = req.body.password


    res.render("login")
  }
};

module.exports = registerController;


