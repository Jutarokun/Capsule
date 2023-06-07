const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Open the database connection
let db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydatabase database.');
});

function register_user(username, email, password) {
    let searchUsername = `SELECT COUNT(*) FROM users WHERE username = ${username}`;
    let searchEmail = `SELECT COUNT(*) FROM users WHERE username = ${email}`;
    let hashedPassword;
    if (db.run(searchUsername) > 0) {
        return 'Username was already picked please enter another username';
    } else if (db.run(searchEmail) > 0) {
        return 'Email is already picked please enter another email';
    } else {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              console.log('error while hashing password');
            } else {
              // Store the hash in the database or wherever you need
              console.log('Hashed password:', hash);
              hashedPassword = hash;
            }
          });
        db.run(`INSERT INTO user (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`)
    }
}

module.exports = {
  register_user
};