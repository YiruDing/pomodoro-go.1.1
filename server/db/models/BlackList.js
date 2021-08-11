const { UUID, UUIDV4, STRING, INTEGER, BOOLEAN } = require('sequelize');
const db = require('../db');

// association table
const BlackList = db.define('blacklist', {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  blocks: {
    type: INTEGER,
    defaultValue: 0,
  },
  blockingEnabled: {
    type: BOOLEAN,
    defaultValue: true
  },
});

module.exports = BlackList;
