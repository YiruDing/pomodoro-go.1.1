const router = require('express').Router()
const { models: { Session, User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [ User ]
    });
    res.send(sessions)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.body
    const session = await Session.create({ userId })
    res.status(201).send(session) 
  } catch (error) {
    next(error)
  }
})

router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId, {
      include: [ User ]
    });
    res.send(session)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userSessions = await Session.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(userSessions)
  } catch (err) {
    next(err)
  }
})

