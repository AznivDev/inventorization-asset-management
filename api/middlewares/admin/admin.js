const { Role, User } = require('../../db/sequelize');
const { sendResStatus } = require('../../utils/api');

exports.isAdmin = (req, res, next) => {
  const { id } = req.user;

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404, 'User not found');

    const { roleId } = user;

    Role.findByPk(roleId).then((role) => {
      if (!role) return sendResStatus(res, 404, 'Role not found');

      if (role.name !== 'admin') return sendResStatus(res, 403);

      next();
    });
  });
};

exports.isNotAdmin = (req, res, next) => {
  const { id } = req.user;

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404, 'User not found');

    const { roleId } = user;

    Role.findByPk(roleId).then((role) => {
      if (!role) return sendResStatus(res, 404, 'Role not found');

      if (role.name === 'admin') return sendResStatus(res, 403);

      next();
    });
  });
};
