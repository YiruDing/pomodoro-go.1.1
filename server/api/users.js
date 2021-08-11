const router = require('express').Router();
const {
  models: { User, Site, Session, Friendship },
} = require('../db');
const requireToken = require('../requireToken');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'profilePic'],
        include: [
          Site,
          Session,
          {
            model: User,
            as: 'requestee',
          },
          {
            model: User,
            as: 'requester',
          },
        ],
      });
      res.json(users);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username', 'email', 'profilePic'],
        include: [
          Site,
          Session,
          {
            model: User,
            as: 'requestee',
          },
          {
            model: User,
            as: 'requester',
          },
        ],
      });
      res.json(user);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});
