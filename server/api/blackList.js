const router = require('express').Router();
const {
  models: { BlackList, User, Site },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const blacklist = await BlackList.findAll({ include: [User, Site] });
    res.send(blacklist);
  } catch (err) {
    next(err);
  }
});

router.put('/:blackListId', async (req, res, next) => {
  try {
    const blackList = await BlackList.findByPk(req.params.blackListId, {
      include: [User, Site],
    });
    const updated = await blackList.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    console.log('error in blackList put route');
    next(error);
  }
});

router.put('/:userId/:siteId', async (req, res, next) => {
  try {
    const blackList = await BlackList.findAll({
      where: {
        siteId: req.params.siteId,
        userId: req.params.userId
      }
    });
    if (blackList[0].blockingEnabled)  {
      blackList[0].blockingEnabled = false;
      await blackList[0].save();
    } else {
      blackList[0].blockingEnabled = true;
      await blackList[0].save();
    }
    res.sendStatus(201);
  } catch (error) {
    console.log('error in blackList put route');
    next(error);
  }
});

module.exports = router;
