// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'Wiki Map',
  keys:['SecretKey','anotherSecretKey'],
  maxAge: 24* 60 * 60 * 1000
}));

// Separated Routes for each Resource
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const usersRoutes = require('./routes/usersRoutes');
const markersRoutes = require('./routes/markersRoutes');
// Mount all resource routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/users', usersRoutes);
app.use('/markers', markersRoutes);

// Change ejs delimiters to bypass vscode linting
const ejs = require('ejs');
const { Pool } = require('pg');
ejs.delimiter = '?';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';
app.get('/', (req, res) => {
  const templateVar = {
    user: req.session["userId"],
    apiKey: process.env.API_KEY
  }
  res.render('index', templateVar);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect("../");
});
