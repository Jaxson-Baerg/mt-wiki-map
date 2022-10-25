const db = require('../connection').db;

const getMarkersByCategory = (category) => {
  return db
    .query(`SELECT * FROM markers WHERE category=(CASE WHEN $1='all' THEN category ELSE $1 END) AND public=true;`, [category])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const getUserMarkers = (user_id) => {
  return db
    .query(`SELECT * FROM markers WHERE user_id=$1;`, [user_id])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const addMarker = (marker) => {
  return db
    .query(`INSERT INTO markers (latitude, longitude, address, thumbnail_photo_url, rating, title, description, user_id, public, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`, [marker.latitude, marker.longitude, marker.address, marker.thumbnail_photo_url, marker.rating, marker.title, marker.description, marker.user_id, marker.display, marker.category])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const deleteMarker = (id) => {
  return db
    .query(`DELETE FROM markers WHERE id=$1 RETURNING *;`, [id])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const editMarker = (marker, user_id) => {
  console.log(marker);
  return db
    .query(`UPDATE markers SET thumbnail_photo_url=$1, rating=$2, title=$3, description=$4, public=$5, category=$6 WHERE id=$7 AND user_id=$8`, [marker.thumbnail_photo_url, marker.rating, marker.title, marker.description, marker.public, marker.category, marker.id, user_id])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

module.exports = {
  getMarkersByCategory,
  getUserMarkers,
  addMarker,
  deleteMarker,
  editMarker
};
