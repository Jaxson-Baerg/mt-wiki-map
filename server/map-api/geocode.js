/* --- Initialize helper files --- */
const fetch = require('node-fetch');
require('dotenv').config();

/* --- Geocoding given an address --- */
const addressToLatLng = (address) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then((response) => {
      return response.json()
        .then(jsonData => {
          return Promise.resolve(jsonData.results[0].geometry.location);
        });
    })
    .catch(err => console.log(err));
};

/* --- Reverse geocoding given coordinates --- */
const latLngToAddress = (latLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${process.env.API_KEY}`)
    .then((response) => {
      return response.json()
        .then(jsonData => {
          return Promise.resolve(jsonData.results[0].formatted_address);
        });
    })
    .catch(err => console.log(err));
};

module.exports = { addressToLatLng, latLngToAddress };
