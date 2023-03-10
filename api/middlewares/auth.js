const jwt = require('jsonwebtoken');

const { sendResStatus } = require('../utils/api');
const { validateEmail, validatePassword } = require('../utils/validation');

exports.verifySignup = (req, res, next) => {
  const { email, name, lastname, password } = req.body;

  if (!email || !name || !lastname || !password) return sendResStatus(res, 400);

  if (!validateEmail(email) || !validatePassword(password))
    return sendResStatus(res, 400, 'Invalid email or password format');

  next();
};

exports.verifySignin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !validateEmail(email)) return sendResStatus(res, 400);

  next();
};

exports.verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  let token = bearer.split(' ')[1];

  if (!bearer) return sendResStatus(res, 403, 'No token provided');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return sendResStatus(res, 401);

    req.user = decoded;
    next();
  });
};
