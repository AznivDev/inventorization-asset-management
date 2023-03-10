const { Type } = require('../../../db/sequelize');
const { sendResBody, sendResStatus } = require('../../../utils/api');

exports.index = (_, res) => Type.findAll().then((types) => sendResBody(res, 200, types));

exports.create = (req, res) => {
  const { name, description } = req.body;

  if (!name) return sendResStatus(res, 400);

  Type.findOne({ where: { name } })
    .then((type) => {
      if (type) return sendResStatus(res, 409);

      new Type({ name: name.trim(), description })
        .save()
        .then((type) => sendResBody(res, 201, type))
        .catch((_) => sendResStatus(res, 500));
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name && !description) return sendResStatus(res, 400);

  Type.findByPk(id)
    .then((type) => {
      if (!type) return sendResStatus(res, 404);

      type.name = name.trim().toLowerCase();
      type.description = description;

      type
        .save()
        .then((type) => sendResBody(res, 200, type))
        .catch((_) => sendResStatus(res, 500));
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Type.findByPk(id)
    .then((type) => {
      if (!type) return sendResStatus(res, 404);

      type.getAssets().then((assets) => {
        if (assets.length > 0) return sendResStatus(res, 400, 'Type is used by some assets');
      });

      type
        .destroy()
        .then((_) => sendResStatus(res, 200))
        .catch((_) => sendResStatus(res, 500));
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.bulkDelete = (req, res) => {
  const { ids } = req.body;

  Type.destroy({
    where: {
      id: ids,
    },
  })
    .then((_) => sendResStatus(res, 204, 'Types deleted'))
    .catch((_) => sendResStatus(res, 500));
};
