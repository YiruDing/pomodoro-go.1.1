const { expect } = require('chai');
const {
  db,
  models: { Site },
} = require('../index');

describe('Site Model', function () {
  before(async () => {
    try {
      await db.sync({ force: true });
      const site = await Site.create({
        siteUrl: 'https://www.instagram.com/',
        category: 'social media',
      });
    } catch (err) {
      console.log(err);
    }
  });

  it('Site should exist', async () => {
    const sites = await Site.findAll();
    expect(sites).to.exist;
  });
  it('Site should return an array', async () => {
    const sites = await Site.findAll();
    expect(sites).to.be.a('array');
    expect(sites.length).to.be.greaterThan(0);
  });
  it('Site should have a `visits` attribute that is a number', async () => {
    const site = await Site.findOne();
    expect(site.visits).to.be.a('number');
  });
});
