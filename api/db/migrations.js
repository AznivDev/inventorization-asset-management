const { generatedUsername, hashedPassword } = require('../utils/api');
const { getEnv } = require('../utils/env');
const { Role, User } = require('./sequelize');

migrateRoles = async () => {
  const newRoles = [
    { name: 'admin', access_level: 3 },
    { name: 'moderator', access_level: 2 },
    { name: 'user', access_level: 1 },
  ];

  return Role.findAll().then((roles) => {
    if (roles.length === 0) Role.bulkCreate(newRoles).catch((_) => console.log('Error creating roles'));
  });
};

migrateAdmin = async () => {
  const role = await Role.findOne({ where: { name: 'admin' } });

  const newAdmin = {
    name: getEnv('ADMIN_NAME'),
    lastname: getEnv('ADMIN_LASTNAME'),
    username: generatedUsername(getEnv('ADMIN_EMAIL')),
    email: getEnv('ADMIN_EMAIL'),
    password: hashedPassword(getEnv('ADMIN_PASSWORD')),
    roleId: role.id,
  };

  return User.findOne({ where: { email: newAdmin.email } }).then((user) => {
    if (!user) User.create(newAdmin).catch((e) => console.log('Error Creating Admin', e));
  });
};

exports.runMigrations = async () => {
  migrateRoles()
    .then(() => migrateAdmin())
    .catch((e) => console.log('Error running migrations', e))
    .finally(() => console.log('Migrations finished'));
};
