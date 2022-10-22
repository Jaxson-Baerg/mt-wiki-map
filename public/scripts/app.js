// Client facing scripts here

// Initialize and add the map
const initMap = () => {
  // The location of Uluru
  const Canada = { lat: 56.1304, lng: -106.3468 }
  const vancouver = { lat: 49.2827, lng: -123.1207 };

  const mapOptions = {
    zoom: 4,
    center: Canada
  }

  // The map, centered at Canada
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // markers is an array of Marker objects to be placed on the map
  const loadMarkers = markers => {
    markers.forEach(marker => {
      const newMarker = new google.maps.Marker({
        position: { lat: marker.latitude, lng: marker.longitude },
        map: map,
        animation: google.maps.Animation.DROP,
        title: marker.title
      })

      // Add info windows to each marker containi
      google.maps.event.addListener(newMarker, "click", () => {
        let infowindow = new google.maps.InfoWindow();
        infowindow.setContent(`
        <h1>${marker.title}</h1>
        <div class="content">
          <p>${marker.description}</p>
          <p>Rating: ${marker.rating}/5</p>
          <img src="">
        </div>
        `);
        infowindow.open(map, newMarker);
     });
    });
  }

  // The marker, positioned at Uluru
  const marker1 = new google.maps.Marker({
    position: vancouver,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    title:"Drag me!"
  });

  google.maps.event.addListener(marker1, "click", () => {
    let infowindow = new google.maps.InfoWindow();
    infowindow.setContent(`
    <h1>Test</h1>
    <div class="content">
      <p>Highly reccomend coming here!</p>
    </div>
    `);
    infowindow.open(map, marker1);
 })

  const placeMarkerAndPanTo = (latLng, map) => {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }

  map.addListener("click", e => placeMarkerAndPanTo(e.latLng, map));

  /*
  const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key={API_KEY}`)
  .then((response) => {
      return response.json();
  }).then(jsonData => {
      console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
  })
  .catch(error => {
      console.log(error);
  });
  */
}

window.initMap = initMap;

