/* --- Function to load all passed markers onto the map api --- */
const loadMarkers = (markers, owned, reset, usersFavourites, loggedIn) => {
  if (reset) { // Clear all pre-existing markers from map
    markerArr.forEach(marker => marker.setMap(null));
    markerArr.length = 0;
  }

  markers.forEach(marker => { // Place each marker at given coords with an animation and title
    let iconURL = iconsObj[marker.category];

    const image = { // Set image for marker icon
      url: iconURL,
      scaledSize : new google.maps.Size(40, 40),
    };

    const newMarker = new google.maps.Marker({ // Declare new instance of a google maps marker
      position: { lat: marker.latitude, lng: marker.longitude },
      map: map,
      animation: google.maps.Animation.DROP,
      title: marker.title,
      icon: image
    });

    // Add listener to reveal info window when a marker is clicked
    google.maps.event.addListener(newMarker, "click", () => {
      $('.gm-ui-hover-effect').trigger('click'); // Close all other info windows
      let infowindow = new google.maps.InfoWindow(); // Declare new instance of a google maps info window
      if (loggedIn) { // Change how an info window is displayed if user is logged in or not
        if (!usersFavourites.includes(marker.id)) { // Change how the favourite button is displayed if the marker is favourited by the logged in user or not
          if (owned) { // Change how the edit and delete buttons are displayed if the user owns the marker or not
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
          } else { // Change how the edit and delete buttons are displayed if the user owns the marker or not
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
        } else { // Change how the favourite button is displayed if the marker is favourited by the logged in user or not
          if (owned) { // Change how the edit and delete buttons are displayed if the user owns the marker or not
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
          } else { // Change how the edit and delete buttons are displayed if the user owns the marker or not
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
      } else { // Change how an info window is displayed if user is logged in or not
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

      // Function to add listeners onto the info window a fifth of a second after it pops up (Could have a helper function and returned promise to allow for a .then() instead of a settimeout)
      setTimeout(() => {
        $('.edit-button').on('click', () => { // Listener to show or hide the info window content and edit form
          $('.content').toggle();
          $('.edit-content:hidden').toggle();
        });

        $('.edit-marker').on('submit', () => { // Listener to submit the edit form and run ajax http request to insert into database
          const $editInputs = $('.edit-marker :input');
          const marker = {};
          $editInputs.each(function() {
            marker[this.name] = $(this).val();
          });
          $.post('/markers', marker)
            .then(result => {console.log(result)})
            .catch(err => {console.log(err)});
        });

        // Listeners to show or hide the favourite buttons
        $('.favourite-container form :visible').on('submit', function() {
          $( this ).toggle();
        });
        $('.favourite-container form :hidden').on('submit', function() {
          $( this ).toggle();
        });
      }, 200);
    });

   markerArr.push(newMarker);
  });
};

// Function to get all marker object data based on category parameter
const getMarkers = (category) => {
  $.get('/markers/public/category', {category: category})
    .then(publicMarkers => {
      $.get('/markers/user/category', {category: category})
        .then(userMarkers => {
          for (marker of publicMarkers) { // Remove duplicate marker objects between the public and user markers
            if (userMarkers.includes(marker)) {
              publicMarkers.splice(publicMarkers.indexOf(marker), 1);
            }
          }
          $.get('/users/favourites')
            .then((userParams) => {
              let favArr;
              if (userParams.loggedIn) { // Only send favourite markers array parameter if the user is logged in
                favArr = userParams.favArr[0].favourites;
              } else {
                favArr = [];
              }

              if (category === 'favourites') { // Ensure that the public markers array of marker objects will have the unfavourite button if the user is sorting by favourite
                loadMarkers(publicMarkers, true, true, favArr, userParams.loggedIn);
              } else {
                loadMarkers(publicMarkers, false, true, favArr, userParams.loggedIn);
              }
              loadMarkers(userMarkers, true, false, favArr, userParams.loggedIn);
            });
        });
    })
    .catch(err => {console.log(err)});
};

// Listener to run get markers with the default sort category of 'all'
$( window ).on('load', () => {
  getMarkers('all');
});

// Listener to run get markers with the chosen sort category each time the selector is changed
$('.category-selector').change(function() {
  getMarkers($(this).val());
});
