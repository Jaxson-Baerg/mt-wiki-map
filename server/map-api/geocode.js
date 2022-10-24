// Geocoding given an address
const addressToLatLng = (address) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
  .then((response) => {
    return response.json();
  }).then(jsonData => {
    return jsonData.results[0].geometry.location;
  })
  .catch(error => {
    console.log(error);
  });
}

// Reverse geocoding given coordinates
const latLngToAddress = (latLng) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${apiKey}`)
  .then((response) => {
    return response.json();
  }).then(jsonData => {
    return jsonData.results[0].formatted_address;
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = { addressToLatLng, latLngToAddress };
