/* global describe beforeEach it */

const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../index');
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');

describe('User model', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    const [
      cody,
      murphy,
      felicity,
      russel,
      stephan,
      ding,
      stanley,
      zaina,
      thompson,
    ] = await Promise.all(
      [
        ['cody@mail.com', '123', 'cody', false],
        ['murphy@mail.com', '123', 'murphy', false],
        ['felicity@mail.com', '123', 'felicity', true],
        ['russel@mail.com', '123', 'russel', true],
        ['stephan@mail.com', '123', 'stephan', true],
        ['ding@mail.com', '123', 'ding', true],
        ['stanley@mail.com', '123', 'stanley', false],
        ['zaina@mail.com', '123', 'zaina', false],
        ['thompson@mail.com', '123', 'thompson', false],
      ].map(([email, password, username, admin]) => {
        return User.create({
          email,
          password,
          username,
          admin,
        });
      })
    );
  });

  it('should require an email address', async function () {
    const user = await User.create({
      username: 'kiki',
      email: 'kiki@mail.com',
      password: 'kiki',
    });
    const users = await User.findAll();
    expect(users.length).to.be.greaterThan(0);
  });
  it('should require a password', async function () {
    const user = await User.create({
      username: 'kiki',
      email: 'kiki@mail.com',
      password: 'kiki',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(10);
  });
  it('provided email address is valid email address', async function () {
    const user = await User.create({
      username: 'kiki',
      email: 'kiki@mail.com',
      password: 'kiki',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(10);
  });
  it('default value for `admin` property is `false`', async function () {
    const user = await User.create({
      username: 'kiki',
      email: 'kiki@mail.com',
      password: 'kiki',
    });
    expect(user.admin).to.equal(false);
  });
  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const user = await User.create({
          username: 'kiki',
          email: 'kiki@mail.com',
          password: 'kiki',
        });
        const token = await user.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(user.id);
      });
    }); // end describe('correctPassword')
    describe('authenticate', () => {
      let user;
      beforeEach(
        async () =>
          (user = await User.create({
            username: 'lucy',
            email: 'lucy@mail.com',
            password: 'lucy',
          }))
      );
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            username: 'lucy',
            email: 'lucy@mail.com',
            password: 'lucy',
          });
          expect(token).to.be.ok;
        });
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              username: 'lucy',
              email: 'lucy@mail.com',
              password: '123',
            });
            throw 'nooo';
          } catch (ex) {
            expect(ex.status).to.equal(401);
          }
        });
      });
    }); // end describe('authenticate')
  }); // end describe('instanceMethods')
}); // end describe('User model')
