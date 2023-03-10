const { Asset, Type, User } = require('../../../db/sequelize');
const { sendResBody, sendResStatus } = require('../../../utils/api');

exports.index = (req, res) => {
  Asset.findAll({
    order: [['userId', 'ASC']],
    include: [Type, User],
  })
    .then((data) => sendResBody(res, 200, data))
    .catch((_) => sendResStatus(res, 500));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Asset.destroy({
    where: {
      id,
    },
  })
    .then((_) => sendResStatus(res, 204, 'Record deleted'))
    .catch((_) => sendResStatus(res, 500));
};

exports.bulkDelete = (req, res) => {
  const { ids } = req.body;

  Asset.destroy({
    where: {
      id: ids,
    },
  })
    .then((_) => sendResStatus(res, 204, 'Assets deleted'))
    .catch((_) => sendResStatus(res, 500));
};

exports.bulkUnassign = (req, res) => {
  const { ids } = req.body;

  Asset.update(
    {
      userId: null,
    },
    {
      where: {
        id: ids,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Assets unassigned'))
    .catch((_) => sendResStatus(res, 500));
};

exports.create = (req, res) => {
  const { name, typeId } = req.body;

  Asset.create({
    name,
    typeId,
  })
    .then((asset) => {
      asset.getType().then((data) => {
        asset = { ...asset.dataValues, type: data };
        sendResBody(res, 201, asset);
      });
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.createWithCount = (req, res) => {
  const { name, typeId, count } = req.body;

  Asset.bulkCreate(
    Array.from({ length: count }, () => ({
      name,
      typeId,
    }))
  )
    .then((_) => sendResStatus(res, 201, 'Assets created'))
    .catch((_) => sendResStatus(res, 500));
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, typeId } = req.body;

  Asset.update(
    {
      name,
      typeId,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((_) => sendResStatus(res, 204, 'Record updated'))
    .catch((_) => sendResStatus(res, 500));
};
