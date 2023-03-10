const { User } = require('../../db/sequelize');
const { sendResStatus, hashedPassword } = require('../../utils/api');

exports.update = (req, res) => {
  const { id } = req.user;
  const { password } = req.body;

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404);

    user
      .update({
        password: password && hashedPassword(password),
      })
      .then((_) => sendResStatus(res, 200))
      .catch((_) => sendResStatus(res, 500));
  });
};
