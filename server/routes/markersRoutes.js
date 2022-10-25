const express = require('express');
const markersQueries = require('../db/queries/markersQueries');
const geoCode = require('../map-api/geocode.js');
require('dotenv').config();
const router = express.Router();

router.get('/category', (req, res) => {
  const category = req.query.category;
  markersQueries.getMarkersByCategory(category)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => res.send(err));
});

router.get('/public/category', (req, res) => {
  const category = req.query.category;
  markersQueries.getPublicMarkersByCategory(category)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => res.send(err));
});

router.get('/user', (req, res) => {
  const user_id = req.session.userId;
  console.log(user_id);
  markersQueries.getUserMarkers(user_id)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  const marker = req.body;
  marker.user_id = req.session.userId;
  if (!marker.user_id) {
    res.redirect('../login');
  } else {
    geoCode.addressToLatLng(marker.address)
      .then((latLng) => {
        marker.latitude = latLng.lat;
        marker.longitude = latLng.lng;

        markersQueries.addMarker(marker)
          .then(marker => {
            if (!marker) {
              res.send({error: "error, marker creation error"});
              return;
            }
            console.log(marker);
            res.redirect('../');
          })
          .catch(err => res.send(err));
      })
      .catch(err => {console.log(err)});
  }
});

router.post('/delete/:id', (req, res) => {
  const marker_id = req.params.id;
  markersQueries.getMarkerById(marker_id)
    .then((marker) => {
      if (marker.user_id !== req.session.userId) {
        console.log("Not the correct user.");
        res.redirect('../../');
      } else {
        markersQueries.deleteMarker(marker_id)
        .then(list => {
          if (list.length < 1) {
            res.send({error: "error, marker id does not exist"});
            return;
          }
          console.log("deleted");
          res.redirect('../../');
        })
        .catch(err => res.send(err));
      }
    })
    .catch(err => {console.log(err)});
});

router.post('/:id', (req, res) => {
  const marker = req.body;
  marker.id = req.params.id;
  markersQueries.getMarkerById(marker.id)
    .then(mk => {
      if (mk.user_id !== req.session.userId) {
        res.redirect('/');
      } else {
        markersQueries.editMarker(marker, req.session.userId)
        .then(marker => {
          console.log("edited");
          res.redirect('/');
        })
        .catch(err => res.send(err));
      }
    })
    .catch(err => {console.log(err)});
});

module.exports = router;
