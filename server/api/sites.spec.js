/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { Site },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Site routes', () => {
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

  describe('/api/sites/', () => {
    it('GET /api/sites', async () => {
      const res = await request(app)
        .get('/api/sites')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(5);
    });

    it('Include user model', async () => {
      const res = await request(app)
        .get('/api/sites')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.have.property('users');
    });
  });
});
