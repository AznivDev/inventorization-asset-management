const { sendResStatus } = require('../utils/api');
const { validatePassword } = require('../utils/validation');
const { Request, User } = require('../db/sequelize');
const bcrypt = require('bcryptjs');

exports.verifyUpdate = (req, res, next) => {
  const { id } = req.user;
  const { password, oldPassword } = req.body;

  if (!password) return sendResStatus(res, 400);
  if (password && !oldPassword) return sendResStatus(res, 400, 'Old Password is required');

  User.scope('withPassword')
    .findByPk(id)
    .then((user) => {
      if (!user) return sendResStatus(res, 404, 'User not found');

      bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        if (!isMatch) return sendResStatus(res, 400, 'Old Password is incorrect');

        if (password && !validatePassword(password)) return sendResStatus(res, 400, 'Invalid password format');

        next();
      });
    });
};
