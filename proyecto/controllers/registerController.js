const db = require('../db/database');
const bcrypt = require('bcryptjs');

const registerController = {
  register: (req, res) => {
    res.render('register');
  },
    registerUser: (req, res) => {
        const { username, email, password } = req.body;
    
        // Check if the user already exists
        const existingUser = db.users.find(user => user.username === username || user.email === email);
        if (existingUser) {
        return res.status(400).send('User already exists');
        }
    
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        // Create a new user object
        const newUser = {
        id: db.users.length + 1,
        username,
        email,
        password: hashedPassword
        };
    
        // Add the new user to the database
        db.users.push(newUser);
    
        // Redirect to login page or send success response
        res.redirect('/login');
    }}

module.exports = registerController;