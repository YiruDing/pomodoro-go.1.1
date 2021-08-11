const { expect } = require('chai');
const {
  db,
  models: { Block, Site },
} = require('../index');

describe('Block Model', function () {
  before(async () => {
    try {
      await db.sync({ force: true });
      const site = await Site.create({
        siteUrl: 'https://www.instagram.com/',
        category: 'social media',
      });
      const block = await Block.create({});
      block.siteId = site.id;
      block.save();
    } catch (err) {
      console.log(err);
    }
  });

  it('can create a new block instance', async () => {
    const blocks = await Block.findAll();
    expect(blocks).to.exist;
  });
  it('Block.findAll should return an array', async () => {
    const blocks = await Block.findAll();
    expect(blocks).to.be.a('array');
    expect(blocks.length).to.be.greaterThan(0);
  });
});
