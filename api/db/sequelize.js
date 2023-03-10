const { Sequelize } = require('sequelize');
const { getEnv } = require('../utils/env');

const REQUEST_APPROVED = 'approved';
const REQUEST_PENDING = 'pending';
const REQUEST_REJECTED = 'rejected';

const sequelize = new Sequelize(getEnv('DB_NAME'), getEnv('DB_USER'), getEnv('DB_PWD'), {
  host: getEnv('DB_HOST'),
  port: getEnv('DB_PORT'),
  dialect: 'mysql',
});

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  access_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3,
    },
  },
});

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isLowercase: true,
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

const Type = sequelize.define('type', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Asset = sequelize.define('asset', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Request = sequelize.define('request', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: Sequelize.ENUM(REQUEST_APPROVED, REQUEST_PENDING, REQUEST_REJECTED),
    allowNull: false,
    defaultValue: 'pending',
  },
  action_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

Asset.belongsTo(Type, { foreignKey: 'typeId' });
Type.hasMany(Asset, { foreignKey: 'typeId' });

Asset.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Asset, { foreignKey: 'userId' });

Request.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Request, { foreignKey: 'userId' });

Request.belongsTo(Asset, { foreignKey: 'assetId' });
Asset.hasMany(Request, { foreignKey: 'assetId' });

User.belongsToMany(Asset, { through: Request });
Asset.belongsToMany(User, { through: Request });

module.exports = { sequelize, User, Role, Type, Asset, Request, REQUEST_APPROVED, REQUEST_PENDING, REQUEST_REJECTED };
