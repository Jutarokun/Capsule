const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Open the database connection
let db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydatabase database.');
});

function register_user(username, email, password, callback) {
    // Querries for the database selection
    let query = `SELECT username FROM user WHERE username = ?`;
    let query2 = `SELECT email FROM user WHERE email = ?`;
    let checkValue = username;
    let checkValue2 = email;
    let username_exists = false;
    let email_exists = false;

    // Uses the querry to check in the database for records
    db.get(query, [checkValue], (err, row) => {
      if (err) {
        console.error(err.message);
        callback(err.message);
      } else if (row) {
        console.log(`${checkValue} is in the database.`);
        username_exists = true;
        callback('Username already taken.'); // Returns the messages with callback
      } else {
        console.log(`${checkValue} is not in the database.`);
      }
      if (!email_exists) {
        db.get(query2, [checkValue2], (err, row) => {
          if (err) {
            console.error(err.message);
            callback(err.message);
          } else if (row) {
            console.log(`${checkValue2} is in the database.`);
            email_exists = true;
            callback('Email already taken.');
          } else {
            console.log(`${checkValue2} is not in the database.`);
          }
          if (!username_exists && !email_exists) {
            // Encrypts the password with the salt rounds
            let hashedPassword = bcrypt.hashSync(password, saltRounds);
            // Inserts the user into the database if no records of the values are found
            db.run(
              `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`,
              [username, email, hashedPassword],
              (err) => {
                if (err) {
                  console.error(err.message);
                  callback(err.message);
                } else {
                  console.log('Inserted into database');
                  callback('Successfully registered.');
                }
              }
            );
          }
        });
      }
    });
  }

  function login_user(email, password, callback) {
    // Query for checking if the email exists
    let query = `SELECT * FROM user WHERE email = ?`;
    // Gets the email with the query
    db.get(query, [email], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (row) {
            // Function for comparing a hashed password with a unhashed Password
            bcrypt.compare(password, row.password, function(err, result) {
                if (err) {
                    console.error(err.message);
                    callback(err.message) // Returns the error message with callback
                } else if (result) {
                    console.log(`${email} and password are correct.`);
                    callback(`${email} and password are correct.`);
                } else {
                    console.log('Password is incorrect.');
                    callback('Password is incorrect.');
                }
            });
        } else {
            console.log(`${email} is not in the database.`);
            callback(`${email} is not in the database.`);
        }
    });
  }

  async function validateCredentials(email, password) {
    try {
      const message = await new Promise((resolve, reject) => {
        login_user(email, password, (message) => {
          resolve(message);
        });
      });
      if (message === `${email} and password are correct.`) {
        return true; // Credentials are valid
      } else {
        return false; // Credentials are invalid
      }
    } catch (error) {
      console.error(error);
      return false; // Credentials are invalid (an error occurred)
    }
  }

  async function getUsernameByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT username FROM user WHERE email = ?`;
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(err.message);
        } else if (row) {
          resolve(row.username);
        } else {
          resolve(null);
        }
      });
    });
  }

  async function getUserIdByName(name) {
    return new Promise((resolve, reject) => {
      const getQuery = `SELECT id FROM user where username = ?`;
      const username = name;
      db.get(getQuery, [username], (err, row) => {
        if (err) {
          reject(err.message);
        } else if (row) {
          resolve(row.id);
        } else {
          resolve(null);
        }
      })
    })
  }

    async function getCapsuleID(name) {
    return new Promise((resolve, reject) => {
      const getQuery = `SELECT id FROM room where room_name = ?`;
      const room_name = name;
      db.get(getQuery, [room_name], (err, row) => {
        if (err) {
          reject(err.message);
        } else if (row) {
          resolve(row.id);
        } else {
          resolve(null);
        }
      })
    })
  }

  async function createCapsule(name, description, userID) {
    return new Promise((resolve, reject) => {
      const checkQuery = `SELECT id FROM room WHERE room_name = ?`;
      const values = [name];
      db.get(checkQuery, values, (err, row) => {
        if (err) {
          reject(err.message);
        } else if (row) {
          // Name already exists, reject with an error message
          reject('Name already exists');
        } else {
          // Name doesn't exist, proceed with capsule creation
          const insertQuery = `INSERT INTO room (room_name, room_description, user_id) VALUES (?, ?, ?)`;
          db.run(insertQuery, [name, description, userID], function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(this.lastID);
            }
          });
        }
      });
    });
  }

  async function connectionUserCapsule(user, capsule) {
    return new Promise((resolve, reject) => {
      // Check if the user and room already exist in the connection
      const checkQuery = `SELECT * FROM user_room WHERE user_id = ? AND room_id = ?`;
      const values = [user, capsule];
      db.get(checkQuery, values, (error, row) => {
        if (error) {
          reject(error);
        } else if (row) {
          // User and room already exist in the connection
          reject('User and room already exist');
        } else {
          // User and room don't exist, proceed with connection establishment
          const insertQuery = `INSERT INTO user_room (user_id, room_id) VALUES (?, ?)`;
          db.run(insertQuery, values, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  }

  async function getCapsulesByName(name) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM room WHERE room_name = ?';
      const value = name;

      db.get(query, value, (err, row) => {
        if (err) {
          reject(err.message);
        } else if (row) {
          console.log(row);
          resolve(row);
        } else {
          resolve(null);
        }
      });
    });
  }

  async function getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM room';
      db.all(query, (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async function getRoomsByUsername(username) {
    let userID = await getUserIdByName(username);
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user_room INNER JOIN room ON user_room.room_id = room.id WHERE user_room.user_id = ?';
      db.all(query, [userID], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows)
          resolve(rows);
        }
      });
    });
  }

async function getRoomFromUser(userID) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT room.room_name
      FROM room_moment
      JOIN room ON room_moment.room_id = room.id
      WHERE room_moment.user_id = ?`;
    db.get(query, [userID], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.room_name);
      }
    });
  });
}

  async function insertIntoCurrentRoom(userID, capsuleID) {
    try {
      const query = `SELECT * FROM room_moment WHERE user_id = ?`;
      db.get(query, [userID], (err, row) => {
        if (err) {
          console.error('Error checking database:', err);
          return;
        }
        if (row) {
          const updateQuery = `UPDATE room_moment SET room_id = ? WHERE user_id = ?`;
          db.run(updateQuery, [capsuleID, userID], (err) => {
            if (err) {
              console.error('Error updating database:', err);
            } else {
              console.log('Record updated successfully');
            }
          });
        } else {
          const insertQuery = `INSERT INTO room_moment (user_id, room_id) VALUES (?, ?)`;
          db.run(insertQuery, [userID, capsuleID], (err) => {
            if (err) {
              console.error('Error inserting into database:', err);
            } else {
              console.log('New record inserted successfully');
            }
          });
        }
      });
    } catch (error) {
      console.error('Error inserting/updating data:', error);
    }
  }

  async function insertIntoMessage(sentMessage, userID, roomID) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO message (sent_message, user_id, room_id) VALUES (?, ?, ?)`;
      const values = [sentMessage, userID, roomID];
      db.run(query, values, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  }

  async function getRoomIDFromUser(userID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM room_moment WHERE user_id = ?`;
      db.get(query, [userID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.room_id);
        }
      });
    });
  }

  async function getUserRooms(userID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM room WHERE user_id = ?`;
      db.all(query, [userID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }

  async function changeUserRoom(room_name, room_description, current_capsule_name) {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT COUNT(*) AS count FROM room WHERE room_name = ?';
      db.get(selectQuery, [room_name], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row.count > 0) {
            resolve('Name already exists');
          } else {
            if (!room_description) {
              // Only room_name is provided, update room_name and keep the existing room_description
              const updateQuery = 'UPDATE room SET room_name = ? WHERE room_name = ?';
              db.run(updateQuery, [room_name, current_capsule_name], (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve('Updated room successfully');
                }
              });
            } else if (!room_name) {
              // Only room_description is provided, update room_description and keep the existing room_name
              const updateQuery = 'UPDATE room SET room_description = ? WHERE room_name = ?';
              db.run(updateQuery, [room_description, current_capsule_name], (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve('Updated room successfully');
                }
              });
            } else {
              // Both room_name and room_description are provided, update both fields
              const updateQuery = 'UPDATE room SET room_name = ?, room_description = ? WHERE room_name = ?';
              db.run(updateQuery, [room_name, room_description, current_capsule_name], (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve('Updated room successfully');
                }
              });
            }
          }
        }
      });
    });
  }

  async function deleteUserCapsule(capsuleID) {
    return new Promise((resolve, reject) => {
      const query_room_moment = `DELETE FROM room_moment WHERE room_id = ?;`;
      const query_message = `DELETE FROM message WHERE room_id = ?;`;
      const query_user_room = `DELETE FROM user_room WHERE room_id = ?;`;
      const query_room = `DELETE FROM room WHERE id = ?;`;
      db.run(query_room_moment, [capsuleID], function (error) {
        if (error) {
          reject(error);
        } else {
          db.run(query_message, [capsuleID], function (error) {
            if (error) {
              reject(error);
            } else {
              db.run(query_user_room, [capsuleID], function (error) {
                if (error) {
                  reject(error);
                } else {
                  db.run(query_room, [capsuleID], function (error) {
                    if (error) {
                      reject(error);
                    } else {
                      resolve('Made it succesfully threw');
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  function getRoomsUserNotIn(userID) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM room
        WHERE id NOT IN (
          SELECT room_id
          FROM user_room
          WHERE user_id = ?
        )
      `;
      db.all(query, [userID], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async function getAllMessages(roomID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM message WHERE room_id = ?`;
      db.all(query, [roomID], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows)
        }
      })
    })
  }

  async function getCurrentRoom(userID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT room_id FROM room_moment WHERE user_id = ?`;
      db.get(query, [userID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    })
  }

  async function getUsernameByID(userID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT username FROM user WHERE id = ?`;
      db.get(query, [userID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }

// Exports the fucntions
module.exports = {
  register_user,
  login_user,
  validateCredentials,
  getUsernameByEmail,
  createCapsule,
  getUserIdByName,
  connectionUserCapsule,
  getCapsuleID,
  getCapsulesByName,
  getAll,
  getRoomsByUsername,
  insertIntoCurrentRoom,
  getRoomFromUser,
  insertIntoMessage,
  getRoomIDFromUser,
  getUserRooms,
  changeUserRoom,
  deleteUserCapsule,
  getRoomsUserNotIn,
  getAllMessages,
  getCurrentRoom,
  getUsernameByID
};