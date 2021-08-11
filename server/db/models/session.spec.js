const { expect } = require('chai');
const {
  db,
  models: { Session, User },
} = require('../index');
const seed = require('../../../script/seed');

describe('Session model', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });
  it('requires a sessionTime', async () => {
    try {
      await Session.create({});
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it('creates a session instance with a sessionTime, startTime and expectedEndTime', async () => {
    const session = await Session.create({
      sessionTime: 3500,
      startTime: new Date(),
    });
    expect(session.sessionTime).to.be.ok;
    expect(session.startTime).to.be.ok;
    expect(session.expectedEndTime).to.be.ok;
    expect(session.actualEndTime).to.not.be.ok;
  });
  it('`calcExpectedEndTime` method calculates and adds expectedEndTime attribute to instances', async function () {
    const session = await Session.create({
      sessionTime: 3500,
      startTime: new Date(),
    });

    const endTime = new Date(session.startTime).setMilliseconds(
      session.sessionTime
    );
    expect(new Date(session.expectedEndTime).getTime()).to.equal(endTime);
  });
  //using a UUID threw this test off; wasn't able to fix quickly but I'll look into
  describe('Session.start() class method', () => {
    it('creates a session with an associated user and goal(if it is provided)', async () => {
      const chris = await User.create({
        username: 'chris',
        password: 'chris_pw',
        email: 'chris@mail.com',
      });

      const session = await Session.start({
        userId: chris.id,
        sessionTime: 30,
        goal: 'Work',
      });

      expect(session.userId).to.equal(chris.id);
      expect(session.sessionTime).to.equal(30);
      expect(session.expectedEndTime).to.be.ok;
    });
    it('creates a session with a startTime and an expectedEndTime', async () => {
      const john = await User.create({
        username: 'john',
        password: 'john_pw',
        email: 'john@mail.com',
      });

      const session = await Session.start({
        userId: john.id,
        sessionTime: 30,
        goal: 'Work',
      });

      expect(session.startTime).to.be.ok;
      expect(session.expectedEndTime).to.be.ok;
      expect(session.actualEndTime).to.not.be.ok;
    });
  });

  it('Session.seed() class method creates a session', async () => {
    const marshall = await User.create({
      username: 'marshall',
      password: 'marshall_pw',
      email: 'marshall@mail.com',
    });
    const kid = await User.create({
      username: 'kid',
      password: 'kid_pw',
      email: 'kid@mail.com',
    });

    const usersArr = [marshall, kid];
    const goals = ['Study', 'Work', 'Read', 'Meditate'];

    const session = await Session.seed(usersArr, goals);

    expect(typeof session.userId).to.equal('string');
    expect(typeof session.sessionTime).to.equal('number');
    expect(typeof session.expectedEndTime).to.equal('object');
    expect(typeof session.successful).to.equal('boolean');
  });

  describe('Session.end() instance method', () => {
    it('adds an actualEndTime to the session instance', async () => {
      const john = await User.create({
        username: 'john',
        password: 'john_pw',
        email: 'john@mail.com',
      });

      const session = await Session.start({
        userId: john.id,
        sessionTime: 30,
        goal: 'Work',
      });

      session.end({ successful: true });
      expect(session.actualEndTime).to.be.ok;
    });
    it('allows user to set `successful` to true or false when they end a session ', async () => {
      const john = await User.create({
        username: 'john',
        password: 'john_pw',
        email: 'john@mail.com',
      });

      const session = await Session.start({
        userId: john.id,
        sessionTime: 30,
        goal: 'Work',
      });

      session.end({ successful: true });
      expect(session.successful).to.equal(true);
    });
  });
});
