/// paste loadmarkers
const loadMarkers = markers => {

  // Clear all pre-existing markers from map
  markerArr.forEach(marker => marker.setMap(null));
  markerArr.length = 0;

  // Place each marker at given coords with an animation and title
  markers.forEach(marker => {

    let iconURL = '';
    switch(marker.category) {
      case 'accomodation':
        iconURL = "https://cdn-icons-png.flaticon.com/512/4118/4118234.png";
        break;
      case 'activity':
        iconURL = "https://www.pngmart.com/files/21/Activities-PNG-Picture.png";
        break;
      case 'food':
        iconURL = "https://cdn-icons-png.flaticon.com/512/2771/2771401.png";
        break;
      case 'shopping':
        iconURL = "https://cdn-icons-png.flaticon.com/512/263/263142.png";
        break;
    }

    var image = {
      url: iconURL,
      scaledSize : new google.maps.Size(40, 40),
    };

    const newMarker = new google.maps.Marker({
      position: { lat: marker.latitude, lng: marker.longitude },
      map: map,
      animation: google.maps.Animation.DROP,
      title: marker.title,
      icon: image
    });

    // Add info window to each marker
    google.maps.event.addListener(newMarker, "click", () => {
      let infowindow = new google.maps.InfoWindow();
      infowindow.setContent(`
      <h1>${marker.title}</h1>
      <div class="content">
        <p>Address: ${marker.address}</p>
        <p>${marker.description}</p>
        <p>Rating: ${marker.rating}/5</p>
        <img src=${marker.thumbnail_photo_url}>
        <form method="POST" action="/markers">
          <button type="submit">Edit</button>
        </form>
        <form method="POST" action="/markers">
          <button type="submit">Delete</button>
        </form>
      </div>
      `);
      infowindow.open(map, newMarker);
   });

   markerArr.push(newMarker);
  });

  // Cluster markers using marker clusterer
  new markerClusterer.MarkerClusterer({
    map,
    markerArr
  });
}

const getMarkers = (category) => {
  $.get('/markers', {category: category})
    .then(markers => loadMarkers(markers))
    .catch(err => {console.log(err)});
};

$( window ).on('load', () => {
  getMarkers('all');
});

$('.category-selector').change(function() {
  getMarkers($(this).val());
});
