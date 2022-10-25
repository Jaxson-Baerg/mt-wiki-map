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
  const userId = req.session["userId"]
  if (!userId) {
    return res.redirect("../login");
  }
  const templateVar = {
    user: req.session["userId"]
  }
  res.render('createMarkers', templateVar);
});

const helper = (favourites, favouritesArr) => {
  return new Promise((resolve, reject) => {
    favourites.forEach(favourite => {
      markersQueries.getMarkerById(favourite)
      .then(fav => {
        favouritesArr.push(fav);
        if (favourites.indexOf(favourite) === favourites.length - 1) {
          resolve(favouritesArr);
        }
      })
      .catch(err => res.send(err));
    })
  })
}

router.get('/profile', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.redirect("../login");
  }
  let email = '';
  let markers;
  let favourites;
  usersQueries.getEmailById(userId)
    .then(emailResult => {
      email = emailResult.email;
      markersQueries.getUserMarkers(userId)
        .then(markerResult => {
          markers = markerResult;
          markersQueries.getFavouriteMarkersById(userId)
            .then(favouritesResult => {
              favourites = favouritesResult;
              let favouritesArr = [];
              helper(favourites, favouritesArr)
              .then((finalFavArr) => {
                const templateVars = {email, markers, finalFavArr}
                res.render('profile', templateVars);
              })
            });
        });
    })
    .catch(err => res.send(err));

});

module.exports = router;
