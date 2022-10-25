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
    center: canada
  }

  // The map, centered at Canada
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  const placeMarkerAndPanTo = (latLng, map) => {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }

  map.addListener("click", e => placeMarkerAndPanTo(e.latLng, map));
}

window.initMap = initMap;
