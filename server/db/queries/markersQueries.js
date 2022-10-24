const db = require('../connection').db;

const addMarker = (marker) => {
  return db
    .query(`INSERT INTO markers (latitude, longitude, thumbnail_photo_url, rating, title, description, user_id, public, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [marker.latitude, marker.longitude, marker.thumbnail_photo_url, marker.rating, marker.title, marker.description, marker.user_id, marker.public, marker.category])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

const deleteMarker = (id) => {
  return db
    .query(`DELETE FROM markers WHERE id=$1 RETURNING *;`, [id])
    .then(result => {return Promise.resolve(result.rows)})
    .catch(err => {console.log(err)});
};

module.exports = {
  addMarker,
  deleteMarker
};
