const router = require('express').Router();
const {
  models: { Session, User },
} = require('../db');
const Task = require('../db/models/Task');
module.exports = router;
const requireToken = require('../requireToken');
router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const sessions = await Session.findAll({
        include: [{ model: User }],
      });
      res.send(sessions);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === req.body.userId || req.user.admin) {
      const { userId, goal } = req.body;
      const createdSession = await Session.create({ userId, goal });
      const eagerLoadedSession = await Session.findOne({
        where: { id: createdSession.id },
        include: [User, Task],
      });
      res.status(201).send(eagerLoadedSession);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

router.get('/:sessionId', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const session = await Session.findByPk(req.params.sessionId, {
        include: [User, Task],
      });
      res.send(session);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

router.put('/:sessionId', requireToken, async (req, res, next) => {
  try {
    const { sessionTime, goal, status, successful } = req.body;
    const { sessionId } = req.params;
    let session = await Session.findByPk(sessionId, {
      include: [User, Task],
    });
    if (session.user.id === req.user.id || req.user.admin) {
      // check to see if we should end session
      if (status === 'Done' && !successful) {
        return res.send(await session.end({ successful, status }));
      }
      if (goal) {
        session.goal = goal;
      }

      if (sessionTime) {
        session.sessionTime = sessionTime;
      }
      session.status = status;
      await session.save();
      res.status(200).send(session);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});
// END SESSION
router.put('/:sessionId/end', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { successful } = req.body;
    const session = await Session.findByPk(sessionId, { include: [User] });
    await session.end({ successful, status: 'Done' });
    const updatedSession = await Session.findByPk(sessionId, {
      include: [User, Task],
    });
    res.send(updatedSession);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.admin) {
      const userSessions = await Session.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      res.send(userSessions);
    } else res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

// task api
router.post('/:sessionId/tasks', requireToken, async (req, res, next) => {
  try {
    if (req.user.admin) {
      const { sessionId } = req.params;
      const { task } = req.body;
      await Task.create({ name: task, sessionId });

      const session = await Session.findOne({
        where: { id: sessionId },
        include: [User, Task],
      });
      res.status(201).send(session);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:sessionId/tasks/:taskId',
  requireToken,
  async (req, res, next) => {
    try {
      if (req.user.admin) {
        const { taskId, sessionId } = req.params;
        const task = await Task.findOne({ where: { sessionId, id: taskId } });
        task.completed = !task.completed;
        await task.save();
        res.send(await Session.findByPk(sessionId, { include: [User, Task] }));
      } else req.sendStatus(401);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:sessionId/tasks/:taskId',
  requireToken,
  async (req, res, next) => {
    try {
      if (req.user.admin) {
        const { taskId, sessionId } = req.params;
        const deleteTask = await Task.findByPk(taskId);
        await deleteTask.destroy();
        const session = await Session.findOne({
          where: { id: sessionId },
          include: [User, Task],
        });
        res.send(session);
      } else res.sendStatus(401);
    } catch (error) {
      next(error);
    }
  }
);
