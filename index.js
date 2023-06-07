const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create an HTTP server instance
const bodyParser = require("body-parser");
const db = require('./database.js');

// set resources to express static
app.use(express.static('public/css'));

app.use('/assets', express.static('public/assets'));

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JavaScript) from a directory
app.use(express.static('public'));

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// set handler for initial request
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/registration.html");
})

app.post('/registration', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let check = db.register_user(username, email, password);
  console.log(check);
  res.redirect('/login');
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
})