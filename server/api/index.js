const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/sites', require('./sites'));
router.use('/blackList', require('./blackList'));
router.use('/friendship', require('./friendship'));
router.use('/blocks', require('./blocks'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
