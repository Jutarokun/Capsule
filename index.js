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
app.use(express.static('public/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (HTML, CSS, JavaScript) from a directory
app.use(express.static('public'));

// socket.io connection event handlers
// Handle Socket.IO connections
socket.on('connection', (socket) => {
  console.log('A client connected');

// Handle "joinCapsule" event from client
socket.on('joinCapsule', async (data) => {
  const name = data.name;
  const token = data.token;
  const username = await getUsernameFromToken(token);
  try {
    const userId = await db.getUserIdByName(username);
    capsuleID = await db.getCapsuleID(name);
    try {
      await db.connectionUserCapsule(userId, capsuleID);
    } catch (error) {
      if (error == 'User and room already exist') {
        socket.emit('userRoomExists');
      }
    }
  } catch (error) {
    console.log(error.message);
    socket.emit('joinError');
  }
})

// Handle "createCapsule" event from client
socket.on('createCapsule', async (data) => {
  let id = '';
  let capsuleID = '';
  const token = data.token;
  console.log('token backend: ' + token);
  const username = await getUsernameFromToken(token);

  try {
    const userId = await db.getUserIdByName(username);
    console.log(userId);
    id = userId;

    console.log('data name: ' + data.name);
    console.log('data description: ' + data.description);
    try {
      capsuleID = await db.createCapsule(data.name, data.description);
    } catch (error) {
      if (error === 'Name already exists') {
        console.log('name already exists');
        socket.emit('nameAlreadyExists');
      } else {
        // Other errors
        console.error(error);
      }
    }
    const capsuleIDP = await db.getCapsuleID(data.name);
    capsuleID = capsuleIDP;

    console.log('CapsuleID after rework: ' + capsuleID);
    await db.connectionUserCapsule(id, capsuleID);

  } catch (error) {
    console.error(error);
  }
});

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // ...
});

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

// Getting the username out of the jwt
function getUsernameFromToken(token) {
  try {
    const decodedToken = jwt.verify(token, key);
    const username = decodedToken.username;
    return username;
  } catch (err) {
    // Handle invalid token or other errors
    console.error('Error decoding token:', err);
    return null;
  }
}

// Generate a JWT token
const generateToken = (username) => {
  const payload = { username };
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
  res.sendFile(__dirname + "/public/login.html");
});

// Handle HTTP POST request to the "/registration" endpoint
app.post('/registration', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.register_user(username, email, password, (message) => {
    console.log('endresult: ' + message);
    res.redirect('/');
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
app.get('/registration', (req, res) => {
  res.sendFile(__dirname + "/public/registration.html");
});

app.get('/logout', authenticateToken, (req, res) => {
  res.clearCookie('token');
  res.redirect('/'); // Redirect to the desired page after clearing the cookie
});

app.get('/search', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/search.html');
})

// Get the server's ip Address
app.get('/ip', (req, res) => {
  const ip = req.connection.remoteAddress;
  res.send(ip);
});
