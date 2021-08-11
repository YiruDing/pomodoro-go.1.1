const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Task = db.define('task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

module.exports = Task;
