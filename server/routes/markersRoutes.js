/* --- Initialize helper files --- */
require('dotenv').config();
const express = require('express');
const markersQueries = require('../db/queries/markersQueries');
const geoCode = require('../map-api/geocode.js');
const router = express.Router();

/* --- Route to ./markers/category to receive an array of markers based off of query parameter --- */
router.get('/category', (req, res) => {
  const category = req.query.category;
  markersQueries.getMarkersByCategory(category)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => res.send(err));
});

/* --- Route to ./markers/public/category to receive only public markers based on query category given --- */
router.get('/public/category', (req, res) => {
  const category = req.query.category;
  if (category === 'favourites') { // Different queries depending on if the user is sorting by favourites or not
    markersQueries.getPublicMarkersByFavourites(req.session.userId)
      .then(markers => {
        res.send(markers);
      })
      .catch(err => console.log(err));
  } else {
    markersQueries.getPublicMarkersByCategory(category)
      .then(markers => {
        res.send(markers);
      })
      .catch(err => console.log(err));
  }
});

/* --- Route to ./markers/user to receive all markers a user has created --- */
router.get('/user', (req, res) => {
  const user_id = req.session.userId;
  markersQueries.getUserMarkers(user_id)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => console.log(err));
});

/* --- Route to ./markers/users/category to receive all markers a user owns but separated by a specific category --- */
router.get('/user/category', (req, res) => {
  const userParams = {
    user_id: req.session.userId,
    category: req.query.category
  };
  markersQueries.getUserMarkersByCategory(userParams)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => console.log(err));
});

/* --- Route to ./markers to create a marker and insert into the database --- */
router.post('/', (req, res) => {
  const marker = req.body;
  marker.user_id = req.session.userId;
  if (!marker.user_id) { // Ensure the marker was created by a logged in user
    res.redirect('../login');
  } else {
    geoCode.addressToLatLng(marker.address) // Request latitude and longitude based on user inputted address
      .then((latLng) => {
        marker.latitude = latLng.lat;
        marker.longitude = latLng.lng;

        markersQueries.addMarker(marker)
          .then(marker => {
            if (!marker) {
              res.send({error: "error, marker creation error"});
              return;
            }
            res.redirect('../');
          });
      })
      .catch(err => {console.log(err)});
  }
});

/* --- Route to ./markers/favourite/:id to add a marker to the list of a logged in user's favourited markers --- */
router.post('/favourite/:id', (req, res) => {
  const user_id = req.session.userId;
  const marker_id = req.params.id;
  markersQueries.addFavouriteMarker(user_id, marker_id)
    .then(() => res.redirect('../../'))
    .catch(err => res.send(err));
});

/* --- Route to ./markers/favourite/:id/remove to remove a marker from a logged in user's list of favourited markers --- */
router.post('/favourite/:id/remove', (req, res) => {
  const user_id = req.session.userId;
  const marker_id = req.params.id;
  markersQueries.removeFavouriteMarker(user_id, marker_id)
    .then(() => res.redirect('../../../'))
    .catch(err => res.send(err));
});

/* --- Route to ./markers/delete/:id to delete a marker from the database --- */
router.post('/delete/:id', (req, res) => {
  const marker_id = req.params.id;
  markersQueries.getMarkerById(marker_id)
    .then((marker) => {
      if (marker.user_id !== req.session.userId) { // Validate if the logged in user is the user that owns the marker being deleted
        console.log("Not the correct user.");
        res.redirect('../../');
      } else {
        markersQueries.deleteMarker(marker_id)
        .then(list => {
          if (list.length < 1) { // Validate if the marker being deleted does not exist
            res.send({error: "error, marker id does not exist"});
            return;
          }
          res.redirect('../../');
        });
      }
    })
    .catch(err => {console.log(err)});
});

/* --- Route to ./markers/:id to modify an already created marker --- */
router.post('/:id', (req, res) => {
  const marker = req.body;
  marker.id = req.params.id;
  markersQueries.getMarkerById(marker.id) // First retreive the marker being edited
    .then(mk => {
      if (mk.user_id !== req.session.userId) {
        res.redirect('/');
      } else {
        markersQueries.editMarker(marker, req.session.userId)
        .then(() => {
          res.redirect('/');
        });
      }
    })
    .catch(err => {console.log(err)});
});

module.exports = router;
