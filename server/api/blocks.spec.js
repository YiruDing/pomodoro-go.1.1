/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Block } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Block routes', () => {
  before(async() => {
    await seed();
  });

  describe('/api/blocks/', () => {

    it('GET /api/blocks', async () => {
      const res = await request(app)
        .get('/api/blocks')
        .expect(200);

      expect(res.body).to.be.an('array');
    });

    it('Include Site model', async () => {
      const res = await request(app)
        .get('/api/blocks')
        .expect(200);

      expect(res.body[0]).to.have.property('site');
    });
    it('Include User model', async () => {
      const res = await request(app)
        .get('/api/blocks')
        .expect(200);

      expect(res.body[0]).to.have.property('user');
    });

  });
});
