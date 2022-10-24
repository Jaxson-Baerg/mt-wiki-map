$('select').on('change', this.val() , getMarkers);

const getMarkers = (category) => {
  $.get('/markers', {category: category})
    .then(markers => {loadMarkers(markers)})
    .catch(err => {console.log(err)});
};
