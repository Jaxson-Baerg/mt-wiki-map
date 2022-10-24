const express = require('express');
const bcrypt = require('bcrypt');
const database = require('../db/connection');
const router  = express.Router();

// login password validation using bcrypt
const login = (email, password) => {
  return database.getUserWithEmail(email)
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
   return res.render('login');
});

// POST for login
router.post('/', (req, res) => {
  const {email, password} = req.body;
  console.log("req.body",req.body);
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error, incorrect email or password"});
        return;
      }
      console.log(user);
      req.session.userId = user.id;
      // res.send({user: {email: user.email, id: user.id}});
      res.redirect('../');
      return;
    })
    .catch(err => res.send(err));
});

module.exports = router;
