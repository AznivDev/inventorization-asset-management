const { Request, User } = require('../db/sequelize');
const { sendResStatus } = require('../utils/api');

exports.verifyCreate = (req, res, next) => {
  const { reason } = req.body;

  if (!reason) return sendResStatus(res, 400);

  next();
};

exports.verifyDelete = (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!id) return sendResStatus(res, 400);

  Request.findByPk(id).then((request) => {
    if (!request) return sendResStatus(res, 404, 'Request not found');

    if (request.userId !== userId) return sendResStatus(res, 403, 'Request does not belong to user');

    next();
  });
};

exports.verifyBulkDelete = (req, res, next) => {
  const userId = req.user.id;
  const { ids } = req.body;

  if (!ids) return sendResStatus(res, 400);

  Request.findAll({ where: { id: ids } }).then((requests) => {
    if (!requests.length) return sendResStatus(res, 404, 'Requests not found');

    requests.forEach((request) => {
      if (request.userId !== userId) return sendResStatus(res, 403, 'Request does not belong to user');
    });

    next();
  });
};

exports.verifyBulkAction = (req, res, next) => {
  const { ids } = req.body;

  if (!ids) return sendResStatus(res, 400);

  Request.findAll({ where: { id: ids } }).then((requests) => {
    if (!requests.length) return sendResStatus(res, 404, 'Requests not found');

    next();
  });
};

exports.verifyRequest = (req, res, next) => {
  const { id } = req.params;

  Request.findByPk(id).then((request) => {
    if (!request) return sendResStatus(res, 404, 'Request not found');

    next();
  });
};

exports.verifyTarget = (req, res, next) => {
  const { userId } = req.params;
  req.target = userId;

  User.findByPk(userId).then((user) => {
    if (!user) return sendResStatus(res, 403, 'Request does not belong to user');

    next();
  });
};
