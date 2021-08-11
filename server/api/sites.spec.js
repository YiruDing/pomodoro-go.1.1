/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Site } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Site routes', () => {
  before(async() => {
    await seed();
  })

  describe('/api/sites/', () => {

    it('GET /api/sites', async () => {
      const res = await request(app)
        .get('/api/sites')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(5);
    })

    it('Include user model', async () => {
      const res = await request(app)
        .get('/api/sites')
        .expect(200)

      expect(res.body[0]).to.have.property('users');
    })

  })
})
