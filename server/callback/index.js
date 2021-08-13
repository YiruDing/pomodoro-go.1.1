const router = require('express').Router();
const axios = require('axios');
const querystring = require('query-string');
require('dotenv').config();
const requireToken = require('../requireToken');
module.exports = router;

let client_id = process.env.CLIENT_ID_SPOTIFY;
let client_secret = process.env.CLIENT_SECRET_SPOTIFY;
let redirect_uri = process.env.API_URL + '/callback';

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      let code = req.query.code;
      if (code) {
        const auth = Buffer.from(`${client_id}:${client_secret}`).toString(
          'base64'
        );

        const params =
          'grant_type=authorization_code&code=' +
          code +
          '&redirect_uri=' +
          redirect_uri +
          '&client_id=' +
          client_id +
          '&client_secret=' +
          client_secret;
        try {
          let response = await axios.post(
            'https://accounts.spotify.com/api/token',
            params,
            {
              headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          if (response.status === 200) {
            const responseData = response.data;
            res.redirect(
              `${process.env.API_URL}/home?` + //updated the hardcoded url
                querystring.stringify({
                  access_token: responseData.access_token,
                  refresh_token: responseData.refresh_token,
                })
            );
          } else {
            res.redirect(`${process.env.API_URL}/home?`); //add more explicit message later
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(req.query.error); //example: https://example.com/callback?error=access_denied
      }
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});
