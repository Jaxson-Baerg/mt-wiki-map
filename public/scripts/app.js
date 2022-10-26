// Client facing scripts here

// Array of markers that will be loaded on map
const markerArr = [];
let mapOptions, map;

// Initialize and add the map
const initMap = () => {
  // Locations of Canada and Vancouver
  const canada = { lat: 56.1304, lng: -106.3468 }

  mapOptions = {
    zoom: 4,
    center: canada,
    mapId: '4a98d4a67a95b928'
  }

  // The map, centered at Canada
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

window.initMap = initMap;
