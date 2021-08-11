const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');
const faker = require('faker');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
const Session = db.define('session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  //expected length of session (in milliseconds)
  sessionTime: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  expectedEndTime: {
    type: DataTypes.DATE,
  },
  actualEndTime: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM(['Not Started', 'Ongoing', 'Done']),
    defaultValue: 'Not Started',
  },
  successful: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  goal: {
    type: DataTypes.ENUM(['Work', 'Study', 'Read', 'Meditate']),
  },
});

/**
 * instanceMethods
 */
Session.prototype.end = async function ({ successful, status }) {
  this.successful = successful;
  this.status = status;
  this.actualEndTime = Date.now();
  await this.save();
  return this;
};
/**
 * classMethods
 */
Session.start = async function ({ userId, sessionTime, goal }) {
  const session = await Session.create({ sessionTime: sessionTime });
  session.userId = userId;
  session.goal = goal;
  await session.save();
  return session;
};

Session.seed = async function (users, goals) {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomGoalIndex = Math.floor(Math.random() * goals.length);
  const sessionTimes = [1800000, 2100000, 2700000, 3000000, 3300000, 3600000];
  const sessionVariances = [-120, -240, -360, -540, 0, 180, 300];
  const booleans = [true, false];
  const randomSessionTime =
    sessionTimes[Math.floor(Math.random() * sessionTimes.length)];

  const session = await Session.create({
    sessionTime: randomSessionTime,
  });
  const user = users[randomUserIndex];
  session.userId = user.id;
  await session.save();
  session.goal = goals[randomGoalIndex];
  const start = faker.date.past();
  session.startTime = start;
  calcExpectedEndTime(session);
  randomSessionVariance =
    sessionVariances[Math.floor(Math.random() * sessionVariances.length)];
  const expected = Date.parse(session.expectedEndTime);
  session.actualEndTime = expected + randomSessionVariance * 1000;
  randomSuccessful = booleans[Math.floor(Math.random() * booleans.length)];
  session.successful = randomSuccessful;

  await session.save();
  return session;
};

/**
 * hooks
 */
const calcStartTime = (session) => {
  session.startTime = session.createdAt;
};

const calcExpectedEndTime = (session) => {
  // const date = Date.parse(session.startTime);
  const { startTime, sessionTime } = session;
  const startDate = new Date(startTime);

  session.expectedEndTime = startDate.setMilliseconds(sessionTime);
  // session.expectedEndTime = date + session.sessionTime * 1000;
  // console.log(session.expectedEndTime);
};

Session.afterCreate((session) => {
  if (session.sessionTime) {
    calcStartTime(session);

    calcExpectedEndTime(session);
  }
});
Session.beforeUpdate((session) => {
  if (!session.startTime && session.sessionTime) {
    session.startTime = new Date();
  }
  if (session.startTime && !session.actualEndTime) {
    calcExpectedEndTime(session);
    session.status = 'Ongoing';
  }
});
Session.afterUpdate((session) => {
  if (session.actualEndTime) {
    session.status = 'Done';
  }
});
module.exports = Session;
