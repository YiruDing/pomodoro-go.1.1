/* global describe beforeEach it */

const { expect } = require('chai');
const supertest = require('supertest');
const {
  db,
  models: { Block },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');
const request = supertest(app);

describe('Block routes', () => {
  let adminToken;
  before(async () => {
    await seed();
    const response = await request.post('/auth/login/').send({
      email: 'stephan@mail.com',
      password: '123',
    });
    const { token } = response.body;
    adminToken = token;
  });

  describe('/api/blocks/', () => {
    it('GET /api/blocks', async () => {
      const res = await request
        .get('/api/blocks')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body).to.be.an('array');
    });

    it('Include Site model', async () => {
      const res = await request
        .get('/api/blocks')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.have.property('site');
    });
    it('Include User model', async () => {
      const res = await request
        .get('/api/blocks')
        .set({ authorization: adminToken })
        .expect(200);

      expect(res.body[0]).to.have.property('user');
    });
  });
});
