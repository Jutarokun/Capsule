const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
const db = require('./database.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const key = process.env.API_KEY;


app.use(express.static('public/css'));
app.use('/assets', express.static('public/assets'));
app.use(express.static('public/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A client connected');
  startChatRooms(socket);

  socket.on('joinCapsule', async (data) => {
    const name = data.name;
    const token = data.token;
    const username = await getUsernameFromToken(token);
    try {
      const userId = await db.getUserIdByName(username);
      capsuleID = await db.getCapsuleID(name);
      try {
        await db.connectionUserCapsule(userId, capsuleID);
        io.sockets.emit('updateBanBoard');
        socket.emit('returnJoinEvent');
      } catch (error) {
        if (error == 'User and room already exist') {
          socket.emit('userRoomExists');
        }
      }
    } catch (error) {
      console.log(error.message);
      socket.emit('joinError');
    }
  });

  socket.on('getMessages', async (data) => {
    try {
      const token = data.token;
      const username = await getUsernameFromToken(token);
      const userID = await db.getUserIdByName(username);
      const roomID = await db.getCurrentRoom(userID);
      const messages = await db.getAllMessages(roomID.room_id);
      for (const message of messages) {
        const userId = message.user_id;
        const username = await db.getUsernameByID(userId);
        message.username = username.username;
      }
      socket.emit('returnGetMessages', { messages });
    } catch (error) {
      console.error('Error getting messages:', error);
    }
  });

  socket.on('getUsersFromCapsule', async (data) => {
    const capsuleName = data.roomName;
    const token = data.token;
    let banned_user;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    const capsuleID = await db.getCapsuleID(capsuleName);
    const allowed = await db.validateUserRoom(userID, capsuleID);
    if (allowed === false) {
      const users = false;
      socket.emit('returnGetUsersFromCapsule', { users, banned_user });
    } else {
      const banned_user = await db.getBannedUsers(capsuleID);
      const users = await db.getUsersFromRoom(capsuleID, username);
      socket.emit('returnGetUsersFromCapsule', { users, banned_user });
    }
  })

  socket.on('leaveCapsule', async (data) => {
    const { capsuleName, token } = data;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    const capsuleID = await db.getCapsuleID(capsuleName);
    await db.deleteUserFromCapsule(userID, capsuleID);
    socket.emit('returnLeaveCapsule');
  })

  socket.on('banUser', async (data) => {
    const username = data.username;
    const roomName = data.roomName;
    const roomID = await db.getCapsuleID(roomName);
    const userID = await db.getUserIdByName(username);
    await db.deleteFromUserRoom(userID);
    await db.banUser(userID, roomID);
    const client_socket_id = await db.getSocketID(userID);
    socket.broadcast.to(client_socket_id.socket_id).emit('refreshPage');
    socket.emit('returnBanUser');
  })

  socket.on('showAllCapsules', async (data) => {
    const token = data.token;
    const username = await getUsernameFromToken(token);
    const list = await db.getRoomsByUsername(username);
    console.log('list: ' + list);
    socket.emit('returnShowAllCapsules', { list });
  });

  socket.on('searchAll', async (data) => {
    const token = data.token;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    const list = await db.getRoomsUserNotIn(userID);
    socket.emit('returnGetAll', { list });
  });

  socket.on('sendMessage', async (data) => {
    const message = data.message;
    const token = data.token;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    const room = await db.getRoomFromUser(userID);
    console.log('username: ' + username + ' room: ' + room);
    const roomID = await db.getRoomIDFromUser(userID);
    await db.insertIntoMessage(message, userID, roomID);
    io.to(room).emit('message', message, username);
  });

  socket.on('unbanUser', async (data) => {
    const username = data.username;
    const roomName = data.roomName;
    const userID = await db.getUserIdByName(username);
    const roomID = await db.getCapsuleID(roomName);
    await db.unbanUser(userID, roomID);
    socket.emit('returnUnbanUser');
  })

  socket.on('searchEvent', async (data) => {
    try {
    const searchName = data.searchValue;
    const token = data.token;
    const dropdownValue = data.dropdownValue;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    console.log(searchName);
    if (dropdownValue === 'capsule_name') {
      const capsule = await db.getCapsulesByName(searchName, userID);
      console.log('capsuuuuuuuuuuuuuule: ' + capsule);
      socket.emit('returnSearchedCapsule', { capsule });
    } else if (dropdownValue === 'capsule_description') {
      const capsule = await db.getCapsuleByRoomDescription(searchName, userID)
      socket.emit('returnSearchedCapsule', { capsule });
    }
    } catch(error) {
      console.log(error);
    }
  });

  socket.on('sendSocketID', async (data) => {
    const { socketID, token } = data;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    await db.insertIntoUserSocketid(userID, socketID);
  })

  socket.on('changeCapsule', async (data) => {
    const {capsuleName, capsuleDescription, currentCapsuleName, currentCapsuleDescription} = data;
    const returnalValue = await db.changeUserRoom(capsuleName, capsuleDescription, currentCapsuleName);
    socket.emit('returnChangeCapsule', { returnalValue });
  })

  socket.on('showUserCapsules', async (data) => {

    const token = data.token;
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    const userRooms = await db.getUserRooms(userID);
    socket.emit('returnUserCapsules', { userRooms });
  })

  socket.on('deleteCapsule', async (data) => {
    const capsuleName = data.capsuleName;
    const capsuleID = await db.getCapsuleID(capsuleName);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa' + capsuleID);
    await db.deleteUserCapsule(capsuleID);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    socket.emit('deleteCapsuleCompleted');
  })

  socket.on('userCapsuleJoin', async (data) => {
    const capsuleName = data.roomName;
    const token = data.token;
    const capsuleID = await db.getCapsuleID(capsuleName);
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);
    await db.insertIntoCurrentRoom(userID, capsuleID);

    socket.emit('returnUserCapsuleJoin');
  });

  socket.on('createCapsule', async (data) => {
    let id = '';
    let capsuleID = '';
    const token = data.token;
    console.log('token backend: ' + token);
    const username = await getUsernameFromToken(token);
    const userID = await db.getUserIdByName(username);

    try {
      const userId = await db.getUserIdByName(username);
      console.log(userId);
      id = userId;

      console.log('data name: ' + data.name);
      console.log('data description: ' + data.description);
      try {
        capsuleID = await db.createCapsule(data.name, data.description, userID);
      } catch (error) {
        if (error === 'Name already exists') {
          console.log('name already exists');
          socket.emit('nameAlreadyExists');
        } else {
          console.error(error);
        }
      }
      const capsuleIDP = await db.getCapsuleID(data.name);
      capsuleID = capsuleIDP;

      console.log('CapsuleID after rework: ' + capsuleID);
      await db.connectionUserCapsule(id, capsuleID);
      socket.emit('successCreateCapsule');
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

async function startChatRooms(socket) {
  try {
    const rooms = await db.getAll();

    rooms.forEach((room) => {
      const roomName = room.room_name;
      console.log(roomName);

      socket.join(roomName, (err) => {
        if (err) {
          console.error('Error joining room:', err);
        } else {
          console.log(`Joined room: ${roomName}`);
        }
      });
    });

    console.log('All chat rooms started successfully');
  } catch (error) {
    console.error('Error starting chat rooms:', error);
  }
}


async function functionAuthenticateToken(token, key) {
  if (token == null) {
    return false;
  } else {
    return new Promise((resolve, reject) => {
      jwt.verify(token, key, (err) => {
        if (err) {
          console.log('error in function');
          resolve(false);
        } else {
          console.log('the token should be valid but is somehow not');
          resolve(true);
        }
      });
    });
  }
}

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) {
    res.sendStatus(401);
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

function getUsernameFromToken(token) {
  try {
    const decodedToken = jwt.verify(token, key);
    const username = decodedToken.username;
    return username;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

function verifyToken(token) {
  if (!token) {
    return false;
  }
  jwt.verify(token, key, (err, user) => {
    if (err) {
      return false;
    }
    return true;
  });
}

const generateToken = (username) => {
  const payload = { username };
  const options = { expiresIn: '8h' };

  return jwt.sign(payload, key, options);
};

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Handle HTTP GET request for the root URL ("/")
app.get('/', async (req, res) => {
  let token = req.cookies.token;
  let isValid = await functionAuthenticateToken(token, key);
  if (token && isValid == true) {
    res.redirect('/home');
    return;
  }
  res.sendFile(__dirname + "/public/login.html");
});

// Handle HTTP POST request to the "/registration" endpoint
app.post('/registration', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  if (username && email && password) {
    if (username.length > 500 || email.length > 500 || password.length > 700) {
      res.send('Your values are tooo high');
      return;
    }

  db.register_user(username, email, password, (message) => {
    console.log('endresult: ' + message);
    if (message == 'Successfully registered.') {
      res.redirect('/');
    } else {
      res.send(message);
    }
  });
  }
});

app.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {

  if (email.length > 500 || password.length > 700) {
    res.send('Your values are tooo high');
    return;
  }

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
    res.sendStatus(401);
  }
  }
});

app.get('/home', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

// Handle HTTP GET request to the "/login" endpoint
app.get('/registration', (req, res) => {
  res.sendFile(__dirname + "/public/registration.html");
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/'); // Redirect to the desired page after clearing the cookie
});

app.get('/search', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/search.html');
});

// Get the server's ip Address
app.get('/ip', (req, res) => {
  const ip = req.connection.remoteAddress;
  res.send(ip);
});

app.get('/createCapsule', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/createCapsule.html');
});

app.get('/chat', authenticateToken , (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.get('/changeCapsule', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/changeRoom.html');
});

app.get('/account', authenticateToken ,async (req, res) => {
  res.sendFile(__dirname + '/public/account.html');
});

app.post('/account', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const token = req.cookies.token;
  const username = await getUsernameFromToken(token);
  const message = await db.changeUserCredentials(email, password, username);
  res.send(message);
});

app.get('/banUser', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/public/banUser.html');
})