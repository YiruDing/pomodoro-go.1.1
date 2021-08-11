const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { User },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('User routes', () => {
  let adminToken;
  before(async () => {
    await seed();
    const response = await request(app).post('/auth/login/').send({
      email: 'stephan@mail.com',
      password: '123',
    });
    const { token } = response.body;
    adminToken = token;
  });

  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(9);
    });

    it('only returns id, username and email', async () => {
      const res = await request(app)
        .get('/api/users')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.not.have.property('password');
    });

    it('include site and session models', async () => {
      const res = await request(app)
        .get('/api/users')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.have.property('sessions');
      expect(res.body[0]).to.have.property('sites');
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
