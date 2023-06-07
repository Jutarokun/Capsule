const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create an HTTP server instance
const io = require('socket.io')(server); // Initialize Socket.IO with the server
const bodyParser = require("body-parser");
const db = require('./database.js');

// set resources to express static
app.use(express.static('public/css'));
app.use('/assets', express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JavaScript) from a directory
app.use(express.static('public'));

// Start the server
const port = 3000; // or any other desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle HTTP GET request for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/registration.html");
});

// Handle HTTP POST request to the "/registration" endpoint
app.post('/registration', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let result = db.register_user(username, email, password);
  console.log('endresult: ' + result);
});

// Handle HTTP GET request to the "/login" endpoint
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events
  // ...
});
