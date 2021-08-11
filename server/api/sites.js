const router = require('express').Router();
const {
  models: { Site, User, BlackList },
} = require('../db');
const requireToken = require('../requireToken');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const sites = await Site.findAll({
        include: [User],
      });
      res.send(sites);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

//need to fix the route below cause it's not working fully
router.get('/user/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin || req.user.id === req.params.userId) {
      const userSites = await Site.findAll({
        include: [
          {
            model: User,
            through: {
              where: {
                userId: req.params.userId,
              },
            },
          },
        ],
      });
      res.send(userSites);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});
//

router.post('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin || req.user.id === req.body.userId) {
      const { siteUrl, category, userId } = req.body;
      const newSite = await Site.create({
        siteUrl,
        category,
      });
      await BlackList.create({
        siteId: newSite.id,
        userId,
      });
      res.send(newSite);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId/:siteId', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin || req.params.userId === req.user.id) {
      const associationToDelete = await BlackList.findOne({
        where: {
          userId: req.params.userId,
          siteId: req.params.siteId,
        },
      });
      await associationToDelete.destroy();
      res.sendStatus(204);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.put('/:siteId', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin || req.user) {
      const site = await Site.findByPk(req.params.siteId);
      const updated = await site.update(req.body);
      res.status(200).send(updated);
    } else res.sendStatus(401);
  } catch (error) {
    console.log('error in sites put route');
    next(error);
  }
});
