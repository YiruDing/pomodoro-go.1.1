const router = require('express').Router();
const bodyparser = require('body-parser');
const request = require('request');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID =
  '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
module.exports = router;

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  let token = req.body.token;
  console.log('Check the google!', token);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
  }
  verify()
    .then(() => {
      res.cookie('session-token', token);
      res.send('success');
    })
    .catch(console.error);
});

router.get('/profile', checkAuthenticated, (req, res) => {
  let user = req.user;
  res.render('profile', { user });
});

router.get('/protectedRoute', checkAuthenticated, (req, res) => {
  res.send('This route is protected');
});

router.get('/logout', (req, res) => {
  res.clearCookie('session-token');
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    // user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.redirect('/login');
    });
}

// let getGoogleProfile = function (accessToken) {
//   return new Promise((resolve, reject) => {
//     if (!accessToken) {
//       resolve(null);
//       return;
//     }
//     request(
//       `https://oauth2.googleapis.com/tokeninfo?id_token=${accessToken}`,
//       function (error, response, body) {
//         if (error) {
//           console.log(error);
//         }
//         console.log(body);
//         body = JSON.parse(body);
//         if (body.error) {
//           reject(body.error);
//         } else {
//           resolve(body);
//         }
//       }
//     );
//   });
// };

// app.post('/user/signin', function (req, res) {
//   if (!req.body.access_token) {
//     res
//       .status(400)
//       .send({ error: 'Request Error: Google access token is required.' });
//     return;
//   }
//   // Get profile from google
//   getGoogleProfile(data.access_token)
//     .then(function (profile) {
//       if (!profile.name || !profile.email) {
//         res.status(400).send({
//           error: 'Permissions Error: name, email are required.',
//         });
//         return;
//       }
//       res.send({
//         user: {
//           name: profile.name,
//           email: profile.email,
//           picture: profile.picture,
//         },
//       });
//     })
//     .catch(function (error) {
//       res.status(500).send({ error: error });
//     });
// });
