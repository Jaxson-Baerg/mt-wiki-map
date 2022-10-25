/// paste loadmarkers
const loadMarkers = markers => {

  // Clear all pre-existing markers from map
  markerArr.forEach(marker => marker.setMap(null));
  markerArr.length = 0;

  // Place each marker at given coords with an animation and title
  markers.forEach(marker => {
    const newMarker = new google.maps.Marker({
      position: { lat: marker.latitude, lng: marker.longitude },
      map: map,
      animation: google.maps.Animation.DROP,
      title: marker.title
    });

    // Add info window to each marker
    google.maps.event.addListener(newMarker, "click", () => {
      $('.gm-ui-hover-effect').trigger('click');
      let infowindow = new google.maps.InfoWindow();
      infowindow.setContent(`
      <div class="content">
        <h1>${marker.title}</h1>
        <p>Address: ${marker.address}</p>
        <p>Category: ${marker.category}</p>
        <p>${marker.description}</p>
        <p>Rating: ${marker.rating}/5</p>
        <img src=${marker.thumbnail_photo_url} width="300" height="250">
        <p>Public: ${marker.public}</p>
        <button class="edit-button" type="button">Edit</button>
        <form method="POST" action="/markers/delete/${marker.id}">
          <button type="submit">Delete</button>
        </form>
      </div>
      <div class="edit-content" hidden>
        <form class="edit-marker" action="/markers/${marker.id}" method="POST">
          <label class="title-edit">Title</label>
          <input name="title" class="title-edit" value="${marker.title}">
          <label>Category</label>
          <input name="category" value="${marker.category}">
          <label>Description</label>
          <input name="description" value="${marker.description}">
          <label>rating</label>
          <input name="rating" value="${marker.rating}">
          <label>Thumbnail Photo URL</label>
          <input name="thumbnail_photo_url" type="file" value="${marker.thumbnail_photo_url}">
          <label>Public</label>
          <input name="public" value="${marker.public}">
          <button type="submit">Submit</button>
        </form>
      </div>
      `);
      infowindow.open(map, newMarker);

      setTimeout(() => {
        $('.edit-button').on('click', () => {
          $('.content').toggle();
          $('.edit-content:hidden').toggle();
        });


        $('.edit-marker').on('submit', () => {
          const $editInputs = $('.edit-marker :input');
          const marker = {};
          $editInputs.each(function() {
            marker[this.name] = $(this).val();
          });
          $.post('/markers', marker)
            .then(result => {console.log(result)})
            .catch(err => {console.log(err)});
        });
      }, 300);
    });

   markerArr.push(newMarker);
  });

  // Cluster markers using marker clusterer
  new markerClusterer.MarkerClusterer({
    map,
    markerArr
  });
};

const getMarkers = (category) => {
  $.get('/markers/category', {category: category})
    .then(catMarkers => {
      $.get('/markers/user')
        .then(userMarkers => {
          const markers = catMarkers.concat(userMarkers);
          loadMarkers(markers);
        })
        .catch(err => {console.log(err)});

    })
    .catch(err => {console.log(err)});
};

$( window ).on('load', () => {
  getMarkers('all');
});

$('.category-selector').change(function() {
  getMarkers($(this).val());
});
