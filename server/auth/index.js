const router = require('express').Router();

const {
  models: { User },
} = require('../db');
module.exports = router;
const generator = require('generate-password');
const { default: axios } = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
    const user = await User.findOne({ where: { email } });
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
      res.send({ token });
    } else {
      res.send({ token: user.generateToken() });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/forgotPassword', async (req, res, next) => {
  if (!req.body.email || req.body.email === '')
    res.status(400).send('email required');
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(401).send('User does not exist');
  } else {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.update({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpires: Date.now() + 3600000,
    });
    const mailService = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.RESET_EMAIL_ADDRESS}`,
        pass: `${process.env.RESET_EMAIL_PASSWORD}`,
      },
    });
    // const returnUrl = `${req.protocol}://${req.get(
    //   'host'
    // )}/resetPassword/${resetToken}`;
    const returnUrl = `http://localhost:8080/resetPassword/${resetToken}`;

    const mailOptions = {
      from: 'NoReply.NoCap@gmail.com',
      to: `${user.email}`,
      subject: 'Reset Password for your Pomodoro Go Account',
      text:
        'You are receiving this email because someone requested that the password be reset for this account.\n\n' +
        'If you did not request this, please ignore this!\n\n' +
        `Click here to reset your password: ${returnUrl}\n\n`,
    };

    console.log('Sending password reset email...');

    mailService.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('error sending password reset email: ', err);
        next(err);
      } else {
        res.status(200).send({ message: 'Recovery email sent!' });
      }
    });
  }
});

router.get('/reset', async (req, res, next) => {
  const { resetToken } = req.query;

  try {
    const user = await User.findAll({
      where: {
        resetPasswordToken: resetToken,
        // resetPasswordTokenExpires: {
        //   $gt: Date.now(),
        // },
      },
    });
    // console.log(user[0]);
    res.status(200).send({
      email: user[0].email,
      message: 'password link accepted',
    });
  } catch (err) {
    console.log('Reset link is invalid or expired', err);
    res.send({ message: 'Reset link is invalid or expired' });
    next(err);
  }
});

router.put('/updatePassword', async (req, res, next) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email,
      },
    });
    if (user[0]) console.log('found user in db');
    const updatedUser = await user[0].update({
      password,
      resetPasswordToken: null,
      resetPasswordTokenExpires: null,
    });
    if (updatedUser) {
      console.log('password updated');
      res.status(200).send({ message: 'Password successfully updated!' });
    }
  } catch (err) {
    console.log('User not found during password update');
    // should be 404
    res.status(200).send({ message: 'User not found during password update' });
    next(err);
  }
});
