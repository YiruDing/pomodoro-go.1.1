const {
  UUID,
  UUIDV4,
  STRING,
  INTEGER,
  TEXT,
  BOOLEAN,
  DATE,
} = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const SALT_ROUNDS = 5;

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  admin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  googleToken: {
    type: TEXT,
    defaultValue: null,
  },
  profilePic: {
    type: STRING,
    defaultValue:
      'https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png',
  },
  resetPasswordToken: {
    type: STRING,
    defaultValue: null,
    allowNull: true,
  },
  resetPasswordTokenExpires: {
    type: DATE,
    defaultValue: null,
    allowNull: true,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function (userObj, method = null) {
  if (method === 'google') {
    return userObj.generateToken();
  }
  const { email, password } = userObj;
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token, method = null) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    let user = await User.findByPk(id);
    if (!user) {
      console.log('no user from jwt');
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(async (user) => {
  try {
    if (!user.username) {
      user.username = user.email;
    }
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  } catch (error) {
    console.log(error);
  }
});
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
