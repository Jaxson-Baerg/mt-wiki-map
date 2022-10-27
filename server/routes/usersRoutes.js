/* --- Initialize helper files --- */
const express = require('express');
const usersQueries = require('../db/queries/usersQueries');
const markersQueries = require('../db/queries/markersQueries');
const geoCode = require('../map-api/geocode.js');
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

/* --- Route to ./users/create to create a new marker and insert it into the database --- */
router.get('/create', (req, res) => {
  const userId = req.session["userId"]
  if (!userId) {
    return res.redirect("../login");
  }
  let address;
  if (req.query.address){
    address = req.query.address;
  } else {
    address = null;
  }
  const templateVar = {
    user: req.session["userId"],
    address
  };
  console.log(templateVar.address);
  res.render('createMarkers', templateVar);
});

/* --- Route to ./users/create/click to change lat and lng into a human readable address --- */
router.get('/create/click', (req, res) => {
  geoCode.latLngToAddress(req.query)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
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
                  for (let i = 0; i < finalFavArr.length; i++) {
                    if (!finalFavArr[i]) {
                      finalFavArr.splice(i, 1);
                      i--;
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
