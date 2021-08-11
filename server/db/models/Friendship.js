const { DataTypes } = require('sequelize');
const db = require('../db');

// association table
const Friendship = db.define('friendship', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  requestStatus: {
    type: DataTypes.ENUM(['pending', 'approved']),
    defaultValue: 'pending',
  },
});

module.exports = Friendship;
