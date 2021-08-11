const router = require('express').Router();

const {
  models: { User },
} = require('../db');
module.exports = router;
const generator = require('generate-password');
const { default: axios } = require('axios');

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post('/google', async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.authorization}`
    );
    const { email, name, imageUrl } = req.body.profileObj;
    const user = await User.findOne({ where: { username: name } });
    if (!user) {
      var password = generator.generate({
        length: 10,
        numbers: true,
      });

      const newUser = await User.create({
        email,
        username: name,
        password,
      });
      const token = newUser.generateToken();
      console.log('token after user create', token);
      res.send({ token });
    } else {
      res.send({ token: user.generateToken() });
    }
  } catch (error) {
    next(error);
  }
});
