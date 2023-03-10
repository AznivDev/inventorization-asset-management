const { Asset, Type } = require('../../db/sequelize');
const { sendResBody } = require('../../utils/api');

exports.index = (req, res) => {
  const { id } = req.user;

  Asset.findAll({
    where: {
      userId: id,
    },
    include: [Type],
    order: [['id', 'DESC']],
  })
    .then((data) => sendResBody(res, 200, data))
    .catch((_) => sendResStatus(res, 404));
};
