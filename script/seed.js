'use strict';

const {
  db,
  models: { User, Session, Site, Task, BlackList, Friendship, Block },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  // console.log('db synced!');
  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody@mail.com' }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@mail.com',
    }),
    User.create({
      username: 'jen',
      password: '123',
      email: 'jenmiller2102@gmail.com',
    }),
    User.create({
      username: 'jack',
      password: '123',
      email: 'jack@mail.com',
    }),
    User.create({
      username: 'lisa',
      password: '123',
      email: 'lisa@mail.com',
    }),
  ]);

  const cody = users[0];
  const murphy = users[1];
  const jen = users[2];
  const jack = users[3];
  const lisa = users[4];

  // Creating admin Users
  const [felicity, russel, stephan, ding] = await Promise.all(
    [
      ['felicity@mail.com', '123', 'felicity', true],
      ['russel@mail.com', '123', 'russel', true],
      ['stephan@mail.com', '123', 'stephan', true],
      ['ding@mail.com', '123', 'ding', true],
    ].map(([email, password, username, admin]) => {
      return User.create({
        email,
        password,
        username,
        admin,
      });
    })
  );

  //Creating sessions
  const sessionSeeds = [];
  const goals = ['Study', 'Work', 'Read', 'Meditate'];
  for (let i = 0; i < 800; i++) {
    sessionSeeds.push(Session.seed(users, goals));
  }

  const sessions = await Promise.all(sessionSeeds);

  const tasks = await Promise.all([
    Task.create({ name: 'User model' }),
    Task.create({ name: 'All Users route' }),
    Task.create({ name: 'Single User route' }),
  ]);

  // Creating sites
  const sites = await Promise.all([
    Site.create({
      name: 'Twitter',
      siteUrl: 'twitter.com',
      category: 'Social Media',
    }),
    Site.create({
      name: 'Instagram',
      siteUrl: 'www.instagram.com',
      category: 'Social Media',
    }),
    Site.create({
      name: 'Facebook',
      siteUrl: 'www.facebook.com',
      category: 'Social Media',
    }),
    Site.create({
      name: 'Netflix',
      siteUrl: 'www.netflix.com',
      category: 'Entertainment',
    }),
    Site.create({
      name: 'Hulu',
      siteUrl: 'www.hulu.com',
      category: 'Entertainment',
    }),
  ]);

  const twitter = sites[0];
  const instagram = sites[1];
  const facebook = sites[2];
  const netflix = sites[3];
  const hulu = sites[4];

  // Creating site and user associations
  await Promise.all([
    BlackList.create({ siteId: twitter.id, userId: cody.id, blocks: 78 }),
    BlackList.create({ siteId: instagram.id, userId: cody.id, blocks: 24 }),
    BlackList.create({ siteId: facebook.id, userId: cody.id, blocks: 59 }),
    BlackList.create({ siteId: netflix.id, userId: cody.id, blocks: 33 }),
    BlackList.create({ siteId: hulu.id, userId: cody.id, blocks: 19 }),
    BlackList.create({ siteId: twitter.id, userId: murphy.id, blocks: 43 }),
    BlackList.create({ siteId: facebook.id, userId: murphy.id, blocks: 142 }),
    BlackList.create({ siteId: netflix.id, userId: murphy.id, blocks: 39 }),
    BlackList.create({ siteId: hulu.id, userId: murphy.id, blocks: 21 }),
    BlackList.create({ siteId: twitter.id, userId: jen.id, blocks: 116 }),
    BlackList.create({ siteId: facebook.id, userId: jen.id, blocks: 65 }),
  ]);

  // Creating friendship
  await Promise.all([
    Friendship.create({
      requesteeId: murphy.id,
      requesterId: cody.id,
      requestStatus: 'approved',
    }),
    Friendship.create({
      requesteeId: murphy.id,
      requesterId: jen.id,
      requestStatus: 'pending',
    }),
    Friendship.create({
      requesteeId: murphy.id,
      requesterId: jack.id,
      requestStatus: 'pending',
    }),
    Friendship.create({
      requesteeId: cody.id,
      requesterId: lisa.id,
      requestStatus: 'approved',
    }),
    Friendship.create({
      requesteeId: felicity.id,
      requesterId: murphy.id,
      requestStatus: 'approved',
    }),
  ]);

  // Creating blocks
  const blockSeeds = [];
  for (let i = 0; i < 200; i++) {
    blockSeeds.push(Block.seed(users, sites));
  }
  await Promise.all(blockSeeds);

  return {
    users: {
      cody: cody,
      murphy: murphy,
    },
    sessions: {
      session0: sessions[0],
      session1: sessions[1],
      session2: sessions[2],
      session3: sessions[3],
      session4: sessions[4],
    },
    tasks: {
      task0: tasks[0],
      task1: tasks[1],
      task2: tasks[2],
    },
    sites: {
      twitter,
      instagram,
      facebook,
      netflix,
      hulu,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
