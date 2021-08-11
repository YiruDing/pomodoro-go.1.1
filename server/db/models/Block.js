const Sequelize = require('sequelize');
const { DataTypes: {
  UUID, UUIDV4, DATE
}
} = Sequelize;
const db = require('../db');
const faker = require('faker');

const Block = db.define('block', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DATE,
    allowNull: true,
  }
});

Block.seed = async function (users, sites) {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomSiteIndex = Math.floor(Math.random() * sites.length);
  const block = await Block.create({});
  const user = users[randomUserIndex];
  block.userId = user.id;
  const site = sites[randomSiteIndex];
  block.siteId = site.id;
  const date = faker.date.past();
  block.date = date;
  await block.save();
  return block;
};


/**
 * hooks
 */
// Block.afterCreate((block) => {
//   block.date = block.createdAt;
//   block.save();
// });

module.exports = Block;
