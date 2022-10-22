// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

///////

const getUserWithEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email=$1;`, [email])
    .then(result => {return Promise.resolve(result.rows[0])})
    .catch(err => {console.log(err)});
};

///////

module.exports = {
  db,
  getUserWithEmail
};
