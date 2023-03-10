const { Request } = require('../../db/sequelize');
const { sendResStatus, sendResBody } = require('../../utils/api');

exports.index = (req, res) => {
  const { id } = req.user;

  Request.findAll({
    where: {
      userId: id,
    },
  })
    .then((requests) => {
      if (!requests) return sendResStatus(res, 404);

      sendResBody(res, 200, requests);
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.create = (req, res) => {
  const { id } = req.user;
  const { reason } = req.body;

  Request.create({
    userId: id,
    reason,
  })
    .then((request) => {
      if (!request) return sendResStatus(res, 404);

      sendResBody(res, 200, request);
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Request.findByPk(id).then((request) => {
    if (!request) return sendResStatus(res, 404);

    request.destroy().then((_) => sendResStatus(res, 200));
  });
};

exports.bulkDelete = (req, res) => {
  const { ids } = req.body;

  Request.findAll({ where: { id: ids } }).then((requests) => {
    if (!requests) return sendResStatus(res, 404);

    requests.forEach((request) => request.destroy());

    sendResStatus(res, 200);
  });
};
