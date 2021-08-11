const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

module.exports = app;

// logging middleware
app.use(morgan('dev'));
app.use(cors());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));
app.use('/google', require('./google'));
app.use('/callback', require('./callback'));
app.use('/spotifyconnect', require('./spotifyconnect'));
app.use('/resetPassword', express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
