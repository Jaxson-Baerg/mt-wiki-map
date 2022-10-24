const express = require('express');
const bcrypt = require('bcrypt');
const usersQueries = require('../db/queries/usersQueries');
const router  = express.Router();

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
      req.session.userId = user.id;
      res.send({user: {user_id: user.id, user_email: user.email}});
    })
    .catch(err => res.send(err));
});

module.exports = router;
