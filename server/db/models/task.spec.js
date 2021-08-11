const { expect } = require('chai');
const {
  db,
  models: { Task, Session },
} = require('../index');
const seed = require('../../../script/seed');

describe('Task model', () => {
  let tasks;
  before(async () => {
    tasks = (await seed()).tasks;
  });
  it('requires a name', async () => {
    try {
      const task = await Task.create();
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it("name can't be empty string", async () => {
    try {
      const task = await Task.create({ name: '' });
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it('creates a task instance with a name', async () => {
    const task = await Task.create({ name: 'Create Nav component' });
    expect(task.name).to.equal('Create Nav component');
  });
  it('user can specify a task for a new session', async () => {
    const task = await Task.create({ name: 'make Dashboard component' });
    const session = await Session.create({ sessionTime: 40 });
    task.sessionId = session.id;
    await task.save();
    expect(task.sessionId).to.equal(session.id);
  });
});
