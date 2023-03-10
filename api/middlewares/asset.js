const { sendResStatus } = require('../utils/api');

const { Asset, Type } = require('../db/sequelize');

exports.verifyAsset = (req, res, next) => {
  const { id } = req.params;

  if (!id) return sendResStatus(res, 400);

  Asset.findByPk(id).then((asset) => {
    if (!asset) return sendResStatus(res, 404, 'Asset not found');

    next();
  });
};

exports.verifyCreate = (req, res, next) => {
  const { name, typeId } = req.body;

  if (!name || !typeId) return sendResStatus(res, 400);

  Type.findByPk(typeId).then((type) => {
    if (!type) return sendResStatus(res, 404, 'Type not found');
    req.type = type;
    next();
  });
};

exports.verifyBulkDelete = (req, res, next) => {
  const { ids } = req.body;

  if (!ids) return sendResStatus(res, 400);

  Asset.findAll({
    where: {
      id: ids,
    },
  }).then((assets) => {
    if (!assets.length) return sendResStatus(res, 404, 'Assets not found');

    for (let i = 0; i < assets.length; i++) if (assets[i].userId) return sendResStatus(res, 400, `Asset ${assets[i].uuid} in use`);

    next();
  });
};

exports.verifyBulkExist = (req, res, next) => {
  const { ids } = req.body;

  if (!ids) return sendResStatus(res, 400);

  Asset.findAll({
    where: {
      id: ids,
    },
  }).then((assets) => {
    if (!assets.length) return sendResStatus(res, 404, 'Assets not found');

    next();
  });
};

exports.verifyTypeBulkDelete = (req, res, next) => {
  const { ids } = req.body;

  if (!ids) return sendResStatus(res, 400);

  Type.findAll({
    where: {
      id: ids,
    },
  }).then((types) => {
    if (!types.length) return sendResStatus(res, 404, 'Types not found');

    Asset.findAll({
      where: {
        typeId: ids,
      },
    }).then((assets) => {
      if (assets.length) return sendResStatus(res, 400, 'Type is in use by some assets');

      next();
    });
  });
};
