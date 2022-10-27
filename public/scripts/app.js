// Array of markers that will be loaded on map
const markerArr = [];
let mapOptions, map;

/* --- Initialize and add the map --- */
const initMap = () => {
  const canada = { lat: 56.1304, lng: -106.3468 }// Locations of Canada and Vancouver

  mapOptions = {
    zoom: 4,
    center: canada,
    mapId: '4a98d4a67a95b928'
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

window.initMap = initMap;
