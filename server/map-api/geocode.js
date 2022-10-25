const fetch = require('node-fetch');
require('dotenv').config();

// Geocoding given an address
const addressToLatLng = (address) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`)
    .then((response) => {
      return response.json()
        .then(jsonData => {
          return Promise.resolve(jsonData.results[0].geometry.location);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

// Reverse geocoding given coordinates
const latLngToAddress = (latLng) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${process.env.API_KEY}`)
    .then((response) => {
      return response.json()
        .then(jsonData => {
          return Promise.resolve(jsonData.results[0].formatted_address);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = { addressToLatLng, latLngToAddress };
