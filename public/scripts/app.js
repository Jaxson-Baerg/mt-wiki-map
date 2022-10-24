// Client facing scripts here

// Initialize and add the map
const initMap = () => {
  // Locations of Canada and Vancouver
  const canada = { lat: 56.1304, lng: -106.3468 }
  const vancouver = { lat: 49.2827, lng: -123.1207 };

  const mapOptions = {
    zoom: 4,
    center: canada
  }

  // The map, centered at Canada
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // markers is an array of Marker objects to be placed on the map
  const loadMarkers = markers => {
    const markerArr = [];
    markers.forEach(marker => {
      const newMarker = new google.maps.Marker({
        position: { lat: marker.latitude, lng: marker.longitude },
        map: map,
        animation: google.maps.Animation.DROP,
        title: marker.title
      })

      // Add info window to each marker
      google.maps.event.addListener(newMarker, "click", () => {
        let infowindow = new google.maps.InfoWindow();
        infowindow.setContent(`
        <h1>${marker.title}</h1>
        <div class="content">
          <p>${marker.description}</p>
          <p>Rating: ${marker.rating}/5</p>
          <img src=${marker.thumbnail_photo_url}>
        </div>
        `);
        infowindow.open(map, newMarker);
     });

     markerArr.push(marker);
    });

    // Cluster markers using marker clusterer
    new markerClusterer.MarkerClusterer({
      map,
      markerArr
    });
  }

  // The marker, positioned at Vancouver
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

}


window.initMap = initMap;

