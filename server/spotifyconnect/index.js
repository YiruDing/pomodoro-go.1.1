const router = require('express').Router();
const axios = require('axios');
const path = require('path');
const querystring = require('query-string');
const requireToken = require('../requireToken');
require('dotenv').config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

module.exports = router;

let client_id = process.env.CLIENT_ID_SPOTIFY;
let redirect_uri = process.env.API_URL + '/callback';

router.get('/', async (req, res, next) => {
  try {
    const scope =
      'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state user-read-recently-played streaming';

    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
        })
    );
  } catch (err) {
    next(err);
  }
});
