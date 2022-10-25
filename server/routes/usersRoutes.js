const express = require('express');
const usersQueries = require('../db/queries/usersQueries');
const markersQueries = require('../db/queries/markersQueries');
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
  res.render('createMarkers');
});

router.get('/profile', (req, res) => {
  let userId = req.session.userId;
  let email = '';
  let markers;
  let favourites;
  usersQueries.getEmailById(userId)
    .then(res => {
      email = res;
      usersQueries.getUserMarkers(userId);
    })
    .then(res => {
      markers = res;
      usersQueries.getFavouriteMarkersById(userId);
    })
    .then(res => {
      favourites = res;
      const templateVars = {email, markers, favourites}
      return res.render('profile', templateVars);
    })
    .catch(err => res.send(err));

});

module.exports = router;
