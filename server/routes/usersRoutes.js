/* --- Initialize helper files --- */
const express = require('express');
const usersQueries = require('../db/queries/usersQueries');
const markersQueries = require('../db/queries/markersQueries');
const router = express.Router();

/* --- Route to ./users to receive all users from database --- */
router.get('/', (req, res) => {
  usersQueries.getUsers()
    .then(users => {
      res.send({users});
    })
    .catch(err => res.send(err));
});

/* --- Route to ./users/logout to clear cookie session and re-route to home page --- */
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('../');
});

/* --- Route to ./users/create to register a new user and insert it into the database --- */
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

/* --- Route to ./users/favourites to get the favourites array from a user --- */
router.get('/favourites', (req, res) => {
  markersQueries.getFavouriteMarkersById(req.session.userId)
    .then((favArr) => {
      res.send({favArr: favArr, loggedIn: req.session.userId});
    })
    .catch(err => {console.log(err)});
});

/* --- Helper function to convert array of marker ids to array of marker objects --- */
const favArrConvert = (favourites, favouritesArr) => {
  return new Promise((resolve, reject) => {
    favourites[0].favourites.forEach(favourite => { // For each marker id in the array, get it's object and push into a new array
      markersQueries.getMarkerById(favourite)
        .then(fav => {
          favouritesArr.push(fav);
          if (favourites[0].favourites.indexOf(favourite) === favourites[0].favourites.length - 1) {
            resolve(favouritesArr); // Resolve promise after the async queries have finished
          }
        })
        .catch(err => res.send(err));
    });
  });
};

/* --- Route to ./users/profile to compile all user data and render the profile page with it --- */
router.get('/profile', (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.redirect("../login");
  }
  let email = '';
  let markers, favourites;
  usersQueries.getEmailById(userId) // Query to get the user's email
    .then(emailResult => {
      email = emailResult.email;
      markersQueries.getUserMarkers(userId) // Query to get the user's owned markers
        .then(markerResult => {
          markers = markerResult;
          markersQueries.getFavouriteMarkersById(userId) // Query to get the user's favourited markers
            .then(favouritesResult => {
              favourites = favouritesResult;
              let favouritesArr = [];
              favArrConvert(favourites, favouritesArr) // Convert array of marker ids to an array of marker objects
                .then((finalFavArr) => {
                  for (const m of finalFavArr) {
                    if (!m) {
                      finalFavArr.splice(finalFavArr.indexOf(m), 1);
                    }
                  }
                  const templateVars = {email, markers, finalFavArr, user: userId}
                  res.render('profile', templateVars);
                });
            });
        });
    })
    .catch(err => res.send(err));
});

module.exports = router;
