const { Role } = require('../../db/sequelize');
const { sendResBody, sendResStatus } = require('../../utils/api');

const accessLevelInRange = (accessLevel) => accessLevel >= 0 && accessLevel <= 3;

exports.index = (_, res) =>
  Role.findAll()
    .then((roles) => sendResBody(res, 200, roles))
    .catch((_) => sendResStatus(res, 500));

exports.create = (req, res) => {
  const { name, accessLevel } = req.body;

  if (!name || !accessLevel || !accessLevelInRange(accessLevel)) return sendResStatus(res, 400);

  Role.create({ name: name.trim().toLowerCase(), access_level: accessLevel })
    .then((role) => sendResBody(res, 201, role))
    .catch((_) => sendResStatus(res, 500));
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, accessLevel } = req.body;

  if (!accessLevelInRange(accessLevel)) return sendResStatus(res, 400);

  Role.update({ name: name.trim().toLowerCase(), access_level: accessLevel }, { where: { id } })
    .then((_) => sendResStatus(res, 200))
    .catch((_) => sendResStatus(res, 500));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Role.findByPk(id)
    .then((role) => {
      if (!role) return sendResStatus(res, 404, 'Role not found');

      role.getUsers().then((users) => {
        if (users.length > 0) return sendResStatus(res, 400, 'Role is used by some users');

        role.destroy().then((_) => sendResStatus(res, 200));
      });
    })
    .catch((_) => sendResStatus(res, 500));
};
