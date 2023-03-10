const { Role, User } = require('../../db/sequelize');
const { sendResStatus } = require('../../utils/api');
const { validateEmail, validatePassword } = require('../../utils/validation');

exports.verifyRole = (req, res, next) => {
  const { role } = req.body;

  if (!role) return sendResStatus(res, 400);

  Role.findByPk(role).then((role) => {
    if (!role) return sendResStatus(res, 404, 'Role not found');

    next();
  });
};

exports.verifyUpdate = (req, res, next) => {
  const { name, lastname, email, password, role } = req.body;

  if (!name && !lastname && !email && !password && !role) return sendResStatus(res, 400);

  if (email && !validateEmail(email)) return sendResStatus(res, 400, 'Invalid email format');
  if (password && !validatePassword(password)) return sendResStatus(res, 400, 'Invalid password format');

  if (role)
    Role.findByPk(role).then((role) => {
      if (!role) return sendResStatus(res, 404, 'Role not found');
    });

  next();
};

exports.verifyUser = (req, res, next) => {
  const { id } = req.params;

  User.findByPk(id).then((user) => {
    if (!user) sendResStatus(res, 404, 'User not found');

    next();
  });
};

exports.verifyUsers = (req, res, next) => {
  const { ids } = req.body;

  User.findAll({ where: { id: ids } }).then((users) => {
    if (users.length !== ids.length) return sendResStatus(res, 404, "One or more users don't exist");

    next();
  });
};
