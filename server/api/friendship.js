const router = require('express').Router();
const {
  models: { Friendship, User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const response = await Friendship.findAll();
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { requesterId, requesteeId } = req.body;
    const newRequest = await Friendship.create({
      requesteeId,
      requesterId,
      requestStatus: 'pending',
    });
    res.send(newRequest).status(201);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { requesteeId, requesterId } = req.body;
    const friendshipToUpdate = await Friendship.findOne({
      where: {
        requesteeId,
        requesterId,
      },
    });
    friendshipToUpdate.requestStatus = 'approved';
    await friendshipToUpdate.save();
    res.send(friendshipToUpdate).status(204);
  } catch (err) {
    next(err);
  }
});
