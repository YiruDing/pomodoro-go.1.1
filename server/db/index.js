//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Site = require('./models/Site');
const BlackList = require('./models/BlackList');
const Task = require('./models/Task');
const Friendship = require('./models/Friendship');
const Block = require('./models/Block');

Site.belongsToMany(User, {
  through: BlackList,
});
User.belongsToMany(Site, { through: BlackList });
Site.hasMany(BlackList);
BlackList.belongsTo(Site);
User.hasMany(BlackList);
BlackList.belongsTo(User);
Session.belongsTo(User);
User.hasMany(Session);
Task.belongsTo(Session);
Session.hasMany(Task);
User.belongsToMany(User, {
  through: Friendship,
  foreignKey: 'requesteeId',
  as: 'requestee',
});
User.belongsToMany(User, {
  through: Friendship,
  foreignKey: 'requesterId',
  as: 'requester',
});

Block.belongsTo(Site);
Site.hasMany(Block);
Block.belongsTo(User);
User.hasMany(Block)


module.exports = {
  db,
  models: {
    User,
    Session,
    Task,
    Site,
    BlackList,
    Friendship,
    Block
  },
};
