/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { Pool } = require('pg');
const { route } = require('./login');
const router  = express.Router();

// Filter by users created markers
router.get('/create', (req, res) => {
  res.render('createMarkers');
});

module.exports = router;
