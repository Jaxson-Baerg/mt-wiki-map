const express = require('express');
const usersQueries = require('../db/queries/usersQueries');
const router  = express.Router();

// Filter by users created markers
router.get('/', (req, res) => {
  usersQueries.getUsers()
    .then(users => {
      res.send({users});
    })
    .catch(err => res.send(err));
});

router.get('/create', (req, res) => {
  const templateVar = {
    user: req.session["userId"]
  }
  res.render('createMarkers', templateVar);
});

module.exports = router;
