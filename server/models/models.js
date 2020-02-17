const crypto = require('crypto');

var Sequelize = require('sequelize');

const envConfigs = require('./config')
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const sequelize = new Sequelize(config.DATABASE_NAME, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: false
});

// setup User table
var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  }
}, {
  instanceMethods: {
    associate: function (models) {
      User.hasOne(models.VerificationToken, {
        as: 'verificationtoken',
        foreignKey: 'id',
        foreignKeyConstraint: true,
      });
    }
  }
});

// setup VerificationToken table
var VerificationToken = sequelize.define('verificationTokens', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: "cascade",
    onDelete: "cascade",
    references: { model: "Users", key: "id" }
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  instanceMethods: {
    associate: function (models) {
      verificationTokens.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        foreignKeyConstraint: true
      });
    }
  }
});

sequelize.sync()
  .then()
  .catch(error => console.log('Error: ', error));

module.exports = { User, VerificationToken };
