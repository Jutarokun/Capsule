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

function register_user(username, email, password) {
  let query = `SELECT username FROM user WHERE username = ?`;
  let query2 = `SELECT email FROM user WHERE email = ?`;
  let checkValue = username;
  let checkValue2 = email;
  let username_exists = false;
  let email_exists = false;
  let message;

  db.get(query, [checkValue], (err, row) => {
    if (err) {
      console.error(err.message);
      // Handle the error appropriately
      return;
    } else if (row) {
      console.log(`${checkValue} is in the database.`);
      username_exists = true;
      message = `${checkValue} is in the database.`;
    } else {
      console.log(`${checkValue} is not in the database.`);
      message = `${checkValue} is not in the database.`;
    }

    if (!email_exists) {
      db.get(query2, [checkValue2], (err, row) => {
        if (err) {
          console.error(err.message);
          // Handle the error appropriately
          message = err.message;
        } else if (row) {
          console.log(`${checkValue2} is in the database.`);
          email_exists = true;
          message = `${checkValue2} is in the database.`;
        } else {
          console.log(`${checkValue2} is not in the database.`);
          message = `${checkValue2} is not in the database.`;
        }
        if (username_exists && email_exists) {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          message = 'Username and Email are already picked please enter other values or try to log in';
        }

        if (!username_exists && !email_exists) {
          let hashedPassword = bcrypt.hashSync(password, saltRounds);
          db.run(`INSERT INTO user (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword], (err) => {
            if (err) {
              console.error(err.message);
              // Handle the error appropriately
              message = err.message;
            }
            console.log('Inserted into database');
            message = 'Inserted into database';
          });
        }
      });
    }
    return message;
  });
}


module.exports = {
  register_user
};