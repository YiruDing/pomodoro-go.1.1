const router = require('express').Router();
const {
  models: { User, Site, Session, Friendship },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});
