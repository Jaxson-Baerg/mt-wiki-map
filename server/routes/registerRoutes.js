const express = require('express');
const bcrypt = require('bcrypt');
const usersQueries = require('../db/queries/usersQueries');
const router  = express.Router();


// GET for register
router.get('/', (req, res) => {
  const templateVar = {
    user: req.session["userId"]
  }
  return res.render('register',templateVar);
});

// POST for register
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  usersQueries.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error, user register error"});
        return;
      }

      console.log(user);
      req.session["userId"] = user.id;
      // res.send({user: {user_id: user.id, user_email: user.email}});
      res.redirect('../');
      return;
    })
    .catch(err => res.send(err));
});

module.exports = router;
