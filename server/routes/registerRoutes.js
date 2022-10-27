/* --- Initialize helper files --- */
const express = require('express');
const bcrypt = require('bcrypt');
const usersQueries = require('../db/queries/usersQueries');
const router = express.Router();


// GET for register
router.get('/', (req, res) => {
  const userId = req.session["userId"]
  if (userId) {
    return res.redirect("../");
  }
  const templateVar = {
    user: req.session["userId"]
  }
  res.render('register',templateVar);
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
      req.session["userId"] = user.id;
      res.redirect('../');
    })
    .catch(err => res.send(err));
});

module.exports = router;
