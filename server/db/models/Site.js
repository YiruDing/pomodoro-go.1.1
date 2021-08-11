const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

//Site model
const Site = db.define('site', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: { type: STRING },
  siteUrl: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  visits: {
    type: INTEGER,
    defaultValue: 0,
  },
});

//need to make site unique, and add a beforecreate hook to check if the new url exists, if yes, add user to the site instead of creating a new site

module.exports = Site;
