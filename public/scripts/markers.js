/// paste loadmarkers
const loadMarkers = (markers, owned, reset, usersFavourites, loggedIn) => {

  if (reset) {
    // Clear all pre-existing markers from map
    markerArr.forEach(marker => marker.setMap(null));
    markerArr.length = 0;
  }

  // Place each marker at given coords with an animation and title
  markers.forEach(marker => {

    let iconURL = '';
    switch(marker.category) {
      case 'accomodation':
        iconURL = "https://cdn-icons-png.flaticon.com/512/5241/5241729.png";
        break;
      case 'activity':
        iconURL = "https://cdn-icons-png.flaticon.com/512/1668/1668531.png";
        break;
      case 'food':
        iconURL = "https://cdn-icons-png.flaticon.com/512/3075/3075977.png";
        break;
      case 'shopping':
        iconURL = "https://cdn-icons-png.flaticon.com/512/3081/3081648.png";
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
      $('.gm-ui-hover-effect').trigger('click');
      let infowindow = new google.maps.InfoWindow();
      if (loggedIn) {
        if (!usersFavourites.includes(marker.id)) {
          if (owned) {
            infowindow.setContent(`
              <div class="content">
                <h1>${marker.title}</h1>
                <p>Address: ${marker.address}</p>
                <p>Category: ${marker.category}</p>
                <p>${marker.description}</p>
                <p>Rating: ${marker.rating}/5</p>
                <img src=${marker.thumbnail_photo_url} width="300" height="250">
                <p>Public: ${marker.public}</p>
                <div class="favourite-container">
                  <form class="add-fav" method="POST" action="/markers/favourite/${marker.id}">
                    <button type="submit">Favourite</button>
                  </form>
                  <form class="remove-fav" method="POST" action="/markers/favourite/${marker.id}/remove" hidden>
                    <button type="submit">Unfavourite</button>
                  </form>
                </div>
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
          } else {
            infowindow.setContent(`
              <div class="content">
                <h1>${marker.title}</h1>
                <p>Address: ${marker.address}</p>
                <p>Category: ${marker.category}</p>
                <p>${marker.description}</p>
                <p>Rating: ${marker.rating}/5</p>
                <img src=${marker.thumbnail_photo_url} width="300" height="250">
                <p>Public: ${marker.public}</p>
                <div class="favourite-container">
                  <form class="add-fav" method="POST" action="/markers/favourite/${marker.id}">
                    <button type="submit">Favourite</button>
                  </form>
                  <form class="remove-fav" method="POST" action="/markers/favourite/${marker.id}/remove" hidden>
                    <button type="submit">Unfavourite</button>
                  </form>
                </div>
              </div>
            `);
          }
        } else {
          if (owned) {
            infowindow.setContent(`
              <div class="content">
                <h1>${marker.title}</h1>
                <p>Address: ${marker.address}</p>
                <p>Category: ${marker.category}</p>
                <p>${marker.description}</p>
                <p>Rating: ${marker.rating}/5</p>
                <img src=${marker.thumbnail_photo_url} width="300" height="250">
                <p>Public: ${marker.public}</p>
                <div class="favourite-container">
                  <form class="add-fav" method="POST" action="/markers/favourite/${marker.id}" hidden>
                    <button type="submit">Favourite</button>
                  </form>
                  <form class="remove-fav" method="POST" action="/markers/favourite/${marker.id}/remove">
                    <button type="submit">Unfavourite</button>
                  </form>
                </div>
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
          } else {
            infowindow.setContent(`
              <div class="content">
                <h1>${marker.title}</h1>
                <p>Address: ${marker.address}</p>
                <p>Category: ${marker.category}</p>
                <p>${marker.description}</p>
                <p>Rating: ${marker.rating}/5</p>
                <img src=${marker.thumbnail_photo_url} width="300" height="250">
                <p>Public: ${marker.public}</p>
                <div class="favourite-container">
                  <form class="add-fav" method="POST" action="/markers/favourite/${marker.id}" hidden>
                    <button type="submit">Favourite</button>
                  </form>
                  <form class="remove-fav" method="POST" action="/markers/favourite/${marker.id}/remove">
                    <button type="submit">Unfavourite</button>
                  </form>
                </div>
              </div>
            `);
          }
        }
      } else {
        infowindow.setContent(`
          <div class="content">
            <h1>${marker.title}</h1>
            <p>Address: ${marker.address}</p>
            <p>Category: ${marker.category}</p>
            <p>${marker.description}</p>
            <p>Rating: ${marker.rating}/5</p>
            <img src=${marker.thumbnail_photo_url} width="300" height="250">
            <p>Public: ${marker.public}</p>
          </div>
        `);
      }
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

        $('.favourite-container form :visible').on('submit', function() {
          $( this ).toggle();
        });
        $('.favourite-container form :hidden').on('submit', function() {
          $( this ).toggle();
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
  $.get('/markers/public/category', {category: category})
    .then(publicMarkers => {
      $.get('/markers/user/category', {category: category})
        .then(userMarkers => {
          for (marker of publicMarkers) {
            if (userMarkers.includes(marker)) {
              publicMarkers.splice(publicMarkers.indexOf(marker), 1);
            }
          }
          $.get('/users/favourites')
            .then((userParams) => {
              let favArr;
              if (userParams.loggedIn) {
                favArr = userParams.favArr[0].favourites;
              } else {
                favArr = [];
              }

              if (category === 'favourites') {
                loadMarkers(publicMarkers, true, true, favArr, userParams.loggedIn);
              } else {
                loadMarkers(publicMarkers, false, true, favArr, userParams.loggedIn);
              }
              loadMarkers(userMarkers, true, false, favArr, userParams.loggedIn);
            })
            .catch(err => {console.log(err)});
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
