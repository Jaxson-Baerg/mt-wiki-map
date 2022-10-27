/* --- Initialize helper files --- */
const db = require('../connection').db;

const getUserWithEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email=$1;`, [email])
    .then(result => {return Promise.resolve(result.rows[0])})
    .catch(err => {console.log(err)});
};

const getEmailById = (userId) => {
  return db
    .query(`SELECT email FROM users WHERE id=$1;`, [userId])
    .then(result => {return Promise.resolve(result.rows[0])})
    .catch(err => {console.log(err)});
};

const addUser = (user) => {
  return db
    .query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`, [user.email, user.password])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const getUsers = () => {
  return db
    .query(`SELECT * FROM users;`)
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

module.exports = {
  getUserWithEmail,
  getEmailById,
  addUser,
  getUsers
};
