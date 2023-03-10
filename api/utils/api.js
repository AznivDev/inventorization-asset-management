const bcrypt = require('bcryptjs');

exports.sendResStatus = (res, status = 500, message = '') => {
  if (message === '')
    switch (status) {
      case 200:
        message = 'Success';
        break;
      case 201:
        message = 'Record created';
        break;
      case 400:
        message = 'Missing required fileds';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      case 403:
        message = 'Access denied';
        break;
      case 404:
        message = 'Record not found';
        break;
      case 409:
        message = 'Record already exists';
        break;
      case 500:
        message = 'Internal server error';
        break;
      default:
        message = 'Unknown error';
    }

  res.statusMessage = message;
  return res.status(status).send();
};

exports.sendResBody = (res, status = 200, body = {}) => {
  res.statusMessage = 'success';
  return res.status(status).json(body);
};

exports.generatedUsername = (email) => email.trim().toLowerCase().split('@')[0] + Math.floor(Math.random() * 1000);

exports.hashedPassword = (password) => bcrypt.hashSync(password.trim(), 8);
