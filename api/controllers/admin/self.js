const { User } = require('../../db/sequelize');
const { sendResStatus, generatedUsername, hashedPassword } = require('../../utils/api');

exports.update = (req, res) => {
  const { id } = req.user;
  const { name, lastname, email, password } = req.body;

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404);

    user
      .update({
        name: name && name.trim(),
        lastname: lastname && lastname.trim(),
        email: email && email.trim().toLowerCase(),
        password: password && hashedPassword(password),
        username: email && generatedUsername(email),
      })
      .then((_) => sendResStatus(res, 200))
      .catch((_) => sendResStatus(res, 500));
  });
};
