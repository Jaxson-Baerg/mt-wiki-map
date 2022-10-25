const express = require('express');
const markersQueries = require('../db/queries/markersQueries');
const router = express.Router();

router.get('/', (req, res) => {
  const category = req.query.category;
  markersQueries.getMarkersByCategory(category)
    .then(markers => {
      res.send(markers);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  const marker = req.body;
  geoCode.addressToLatLng(marker.address)
    .then((latLng) => {
      marker.latitude = latLng.lat;
      marker.longitude = latLng.lng;
    })
    .catch(err => {console.log(err)});

  markersQueries.addMarker(marker)
    .then(marker => {
      if (!marker) {
        res.send({error: "error, marker creation error"});
        return;
      }
      console.log(marker);
      res.send(marker);
    })
    .catch(err => res.send(err));
});

router.delete('/:id', (req, res) => {
  const marker_id = req.params.id;
  markersQueries.deleteMarker(marker_id)
    .then(list => {
      if (list.length < 1) {
        res.send({error: "error, marker id does not exist"});
        return;
      }
      console.log("deleted");
      res.send({message: "deleted"});
    })
    .catch(err => res.send(err));
});

module.exports = router;