const { User } = require('../db/sequelize');
const { sendResStatus, sendResBody, hashedPassword } = require('../utils/api');
const { validatePassword } = require('../utils/validation.js');

exports.self = (req, res) => {
  const { id } = req.user;

  User.findByPk(id, { include: 'role' })
    .then((user) => {
      if (!user) return sendResStatus(res, 401);

      sendResBody(res, 200, user);
    })
    .catch((_) => sendResStatus(res, 500));
};
