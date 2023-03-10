const { User } = require('../sequelize');

exports.findByEmail = (email) => User.findOne({ where: { email } });
