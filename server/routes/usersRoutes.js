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
  const userId = req.session["userId"]
  if (!userId) {
    return res.redirect("../login");
  }
  const templateVar = {
    user: req.session["userId"]
  }
  res.render('createMarkers', templateVar);
});

router.get('/profile', (req, res) => {
  const userId = req.session["userId"]
  if (!userId) {
    return res.redirect("../login");
  }
  const templateVar = {
    user: req.session["userId"]
  }
  res.render('profile', templateVar);
})
module.exports = router;
