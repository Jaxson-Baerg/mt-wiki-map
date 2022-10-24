const getMarkers = (category) => {
  $.get('/markers', {category: category})
    .then(markers => {loadMarkers(markers)})
    .catch(err => {console.log(err)});
};

const $categorySelector = $('#category-selector');

$categorySelector.on('change', $categorySelector.val() , getMarkers);
