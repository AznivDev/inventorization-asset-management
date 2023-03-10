const { User, Role } = require('../../db/sequelize');
const { sendResStatus, generatedUsername, hashedPassword } = require('../../utils/api');

exports.signup = (req, res) => {
  const { email, name, lastname, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user) return sendResStatus(res, 409);

      Role.findOne({ where: { name: 'admin' } })
        .then((role) => {
          if (!role) return sendResStatus(res, 404, 'Role not found');

          new User({
            name: name.trim(),
            lastname: lastname.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword(password),
            username: generatedUsername(email),
            roleId: role.id,
          })
            .save()
            .then((_) => sendResStatus(res, 201))
            .catch((_) => sendResStatus(res, 500, 'Authentication failed'));
        })
        .catch((_) => sendResStatus(res, 500));
    })
    .catch((_) => sendResStatus(res, 500));
};
