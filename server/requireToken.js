const {
  models: { User },
} = require('./db');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = await User.findByToken(token);
      // console.log(user);
      req.user = user;
      next();
    } catch (error) {
      console.log('Error in requireToken middleware', error);
      next(error);
    }
  } else res.sendStatus(401);
};
