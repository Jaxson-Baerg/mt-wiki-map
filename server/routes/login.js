const express = require('express');
const bcrypt = require('bcrypt');
const database = require('../db/connection');
const router  = express.Router();

// login password validation using bcrypt
const login = (email, password) => {
  return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
};

// POST for login
router.post('/', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error, incorrect password"});
        return;
      }
      console.log(user);
      req.session.userId = user.id;
      res.send({user: {email: user.email, id: user.id}});
    })
    .catch(err => res.send(err));
});

module.exports = router;
