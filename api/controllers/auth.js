const { User } = require('../db/sequelize');
const { sendResStatus, sendResBody } = require('../utils/api');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.scope('withPassword')
    .findOne({ where: { email } })
    .then((user) => {
      if (!user) return sendResStatus(res, 401);

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) return sendResStatus(res, 401);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      sendResBody(res, 200, { token });
    })
    .catch((_) => sendResStatus(res, 500));
};
