// Array of markers that will be loaded on map
const markerArr = [];
let mapOptions, map;

const iconsObj = {
  accomodation: "https://cdn-icons-png.flaticon.com/512/5241/5241729.png",
  activity: "https://cdn-icons-png.flaticon.com/512/1668/1668531.png",
  food: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  shopping: "https://cdn-icons-png.flaticon.com/512/3081/3081648.png"
}

/* --- Initialize and add the map --- */
const initMap = () => {
  const canada = { lat: 56.1304, lng: -106.3468 }// Locations of Canada and Vancouver

  mapOptions = {
    zoom: 4,
    center: canada,
    mapId: '4a98d4a67a95b928'
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  /* --- Allow user to click on the map to place a marker there --- */
  const createMarker = (latLng, map) => {
    const latLngObj = JSON.stringify(latLng.toJSON(), null, 2);
    $.get('/users/create/click', JSON.parse(latLngObj))
      .then(response => {window.location = `/users/create?address=${response}`}) // Route page over to the create marker page with the address to autofill
      .catch(err => {console.log(err)});
  };
  map.addListener("click", e => createMarker(e.latLng, map));

  /* --- Legend on map api --- */
  const legend = document.getElementById("legend");
  for (const category in iconsObj) {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${iconsObj[category]}"> ${category}`;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
}

window.initMap = initMap;
