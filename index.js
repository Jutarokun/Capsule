const express = require('express');
const app = express();
const server = require('http').createServer(app); // Create an HTTP server instance
const socket = require('socket.io')(server); // Initialize Socket.IO with the server
const bodyParser = require("body-parser");
const db = require('./database.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// key for the jwt
const key = 'b122656a9a73db37dc0af655d157d2631111d2e9154149fc5c365496408a5962';

// set resources to express static
app.use(express.static('public/css'));
app.use('/assets', express.static('public/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (HTML, CSS, JavaScript) from a directory
app.use(express.static('public'));

// Token authentication
// Token authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden
    }
    // Token is valid, attach the user information to the request object
    req.user = user;
    next();
  });
};

// Generate a JWT token
const generateToken = (email) => {
  const payload = { email };
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, key, options);
};



// Start the server
const port = 8080; // or any other desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle HTTP GET request for the root URL ("/")
app.get('/', (req, res) => {
  let token = req.cookies.token;
  if (token != null) {
    res.redirect('/home');
  }
  res.sendFile(__dirname + "/public/registration.html");
});

// Handle HTTP POST request to the "/registration" endpoint
app.post('/registration', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.register_user(username, email, password, (message) => {
    console.log('endresult: ' + message);
    res.redirect('/login');
  });
});

app.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // Validate the user credentials
  const isValid = await db.validateCredentials(email, password);

  if (isValid) {
    // Retrieve the username from the database
    const username = await db.getUsernameByEmail(email);
    // Generate a JWT token
    const token = generateToken(username);

    // Set the cookie token
    res.cookie('token', token, { httpOnly: false });
    res.redirect('/home');
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

app.get('/home', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

// Handle HTTP GET request to the "/login" endpoint
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// Handle Socket.IO connections
socket.on('connection', (socket) => {
  console.log('A client connected');

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle custom events
  // ...
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/'); // Redirect to the desired page after clearing the cookie
});

  // Handle "createCapsule" event from client
  socket.on('createCapsule', (data) => {
    const capsule = createCapsule(data.name, data.description);
    // Send the created capsule to the client
    socket.emit('capsuleCreated', capsule);
    // Broadcast the created capsule to other clients
    socket.broadcast.emit('capsuleCreated', capsule);
  });

  // Handle "joinCapsule" event from client
  socket.on('joinCapsule', (capsuleId) => {
    // Add the client to the list of clients for the specified capsule
    addClientToCapsule(socket.id, capsuleId);
    // Send the joined capsule to the client
    socket.emit('capsuleJoined', getCapsule(capsuleId));
    // Broadcast a "userJoined" event to other clients in the same capsule
    socket.to(capsuleId).emit('userJoined', getClientList(capsuleId));
  });