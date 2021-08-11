const router = require('express').Router();
const {
  models: { Site, Block, User },
} = require('../db');
const requireToken = require('../requireToken');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const blocks = await Block.findAll({
        include: [User, Site],
        order: [['createdAt', 'DESC']],
      });
      res.send(blocks);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin || req.user.id === req.params.userId) {
      if (req.body.siteId) {
        const { siteId } = req.body;
        const block = await Block.create({
          siteId,
        });
        res.send(block);
      } else if (req.body.userAttempted) {
        const matchingSite = await Site.findOne({
          where: {
            siteUrl: req.body.userAttempted,
          },
        });
        if (matchingSite) {
          const { userId } = req.body;
          const block = await Block.create({
            siteId: matchingSite.id,
            userId,
          });
          const date = block.createdAt;
          block.date = date;
          await block.save();
          console.log('after adding date', block.date);
          res.send(block);
        }
      }
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});
