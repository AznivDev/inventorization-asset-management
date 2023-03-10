const { Request, sequelize, REQUEST_APPROVED, REQUEST_REJECTED, User } = require('../../db/sequelize');
const { sendResStatus, sendResBody } = require('../../utils/api');

exports.approve = (req, res) => {
  const { id } = req.params;

  Request.update(
    {
      status: REQUEST_APPROVED,
      action_date: sequelize.fn('NOW'),
    },
    {
      where: {
        id: id,
        userId: req.target,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Request approved'))
    .catch((_) => sendResStatus(res, 500));
};

exports.decline = (req, res) => {
  const { id } = req.params;

  Request.update(
    {
      status: REQUEST_REJECTED,
      action_date: sequelize.fn('NOW'),
    },
    {
      where: {
        id: id,
        userId: req.target,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Request Rejected'))
    .catch((_) => sendResStatus(res, 500));
};

exports.index = (_, res) => {
  Request.findAll({
    include: [User],
    order: [['createdAt', 'ASC']],
  })
    .then((data) => sendResBody(res, 200, data))
    .catch((_) => sendResStatus(res, 500));
};

exports.bulkApprove = (req, res) => {
  const { ids } = req.body;

  Request.update(
    {
      status: REQUEST_APPROVED,
      action_date: sequelize.fn('NOW'),
    },
    {
      where: {
        id: ids,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Requests approved'))
    .catch((_) => sendResStatus(res, 500));
};

exports.bulkDecline = (req, res) => {
  const { ids } = req.body;

  Request.update(
    {
      status: REQUEST_REJECTED,
      action_date: sequelize.fn('NOW'),
    },
    {
      where: {
        id: ids,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Requests rejected'))
    .catch((_) => sendResStatus(res, 500));
};
