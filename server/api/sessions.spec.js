const { expect } = require('chai');
const request = require('supertest');
const seed = require('../../script/seed');
const app = require('../app');
const {
  models: { User, Session },
} = require('../db');
describe('Session routes', () => {
  let user, adminToken;
  before(async () => {
    await seed();
    user = await User.findOne({ where: { username: 'cody' } });
    const response = await request(app).post('/auth/login/').send({
      email: 'stephan@mail.com',
      password: '123',
    });
    const { token } = response.body;
    adminToken = token;
  });

  describe('GET /api/sessions/', () => {
    it('returns all sessions', async () => {
      const res = await request(app)
        .get('/api/sessions')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.above(0);
    });

    it('Include user model', async () => {
      const res = await request(app)
        .get('/api/sessions')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.have.property('user');
    });
  });
  describe('POST /api/sessions/', () => {
    it('creates a new session', async () => {
      const res = await request(app)
        .post('/api/sessions')
        .set({ authorization: adminToken })
        .send({ userId: user.id });
      expect(JSON.parse(res.text).userId).to.equal(user.id);
    });
  });
  describe('PUT /api/session/:id', () => {
    it('updates a session', async () => {
      const session = await Session.create({ userId: user.id });
      const { sessionTime } = session;
      const res = await request(app)
        .put(`/api/sessions/${session.id}`)
        .set({ authorization: adminToken })
        .send({ sessionTime: 600 });
      const updatedSession = JSON.parse(res.text);
      expect(updatedSession.sessionTime).to.not.equal(sessionTime);
    });
  });
  // end describe('/api/sessions')
}); // end describe('Session routes')
