/* --- Initialize helper files --- */
const express = require('express');
const bcrypt = require('bcrypt');
const usersQueries = require('../db/queries/usersQueries');
const router = express.Router();

// Login password validation using bcrypt
const login = (email, password) => {
  return usersQueries.getUserWithEmail(email)
    .then(user => {
      if (!user) return null;
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
};

// GET for login
router.get('/', (req, res) => {
  const userId = req.session["userId"];
  if (userId) {
    return res.redirect("../");
  }
  const templateVar = {
    user: userId
  };
  return res.render('login',templateVar);
});

// POST for login
router.post('/', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        console.log('Incorrect email or password');
        res.redirect('./login');
      } else {
        req.session["userId"] = user.id;
        res.redirect('../');
      }
    })
    .catch(err => res.send(err));
});

module.exports = router;
