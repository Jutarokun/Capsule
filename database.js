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

  async function createCapsule(name, description) {
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
          const insertQuery = `INSERT INTO room (room_name, room_description) VALUES (?, ?)`;
          db.run(insertQuery, [name, description], function (error) {
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
  getAll
};