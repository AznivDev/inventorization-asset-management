const { Op } = require('sequelize');
const { User, Asset, Role } = require('../../db/sequelize');
const { sendResStatus, generatedUsername, hashedPassword, sendResBody } = require('../../utils/api');

exports.create = (req, res) => {
  const { name, lastname, email, password, role } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (user) return sendResStatus(res, 409);

      new User({
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword(password),
        username: generatedUsername(email),
        roleId: role,
      })
        .save()
        .then((user) => {
          user.getRole().then((data) => {
            user = { ...user.dataValues, role: data };
            sendResBody(res, 201, user);
          });
        })
        .catch((_) => sendResStatus(res, 500, 'Authentication failed'));
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.update = (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  const { id } = req.params;

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404);

    user
      .update({
        name: name && name.trim(),
        lastname: lastname && lastname.trim(),
        email: email && email.trim().toLowerCase(),
        password: password && hashedPassword(password),
        roleId: role,
      })
      .then((user) => {
        user.getRole().then((data) => {
          user = { ...user.dataValues, role: data };
          sendResBody(res, 200, user);
        });
      })
      .catch((_) => sendResStatus(res, 500));
  });
};

exports.assignAsset = (req, res) => {
  const { id } = req.params;
  const { assets } = req.body;

  Asset.findAll({ where: { id: assets } }).then((data) => {
    if (data.length !== assets.length) return sendResStatus(res, 404, "One or more assets don't exist");
  });

  User.findByPk(id).then((user) => {
    if (!user) return sendResStatus(res, 404);

    user.getAssets().then((data) => {
      const existingAssets = data.map((asset) => asset.id);
      const newAssets = assets.filter((asset) => !existingAssets.includes(asset));

      user
        .addAssets(newAssets)
        .then((_) => sendResStatus(res, 200))
        .catch((_) => sendResStatus(res, 500));
    });
  });
};

exports.index = (req, res) => {
  const { id } = req.user;

  User.findAll({
    where: {
      [Op.not]: [{ id }],
    },
    include: [Role],
    order: [['roleId', 'ASC']],
  })
    .then((data) => sendResBody(res, 200, data))
    .catch((_) => sendResStatus(res, 500));
};

exports.show = (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((data) => {
      if (!data) return sendResStatus(res, 404);

      sendResBody(res, 200, data);
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: {
      id,
    },
  }).then((_) => {
    Asset.update(
      {
        userId: null,
      },
      {
        where: {
          userId: id,
        },
      }
    )
      .then((_) => sendResStatus(res, 204, 'User deleted'))
      .catch((_) => sendResStatus(res, 500));
  });
};

exports.bulkDelete = (req, res) => {
  const { ids } = req.body;

  User.destroy({
    where: {
      id: ids,
    },
  }).then((_) => {
    Asset.update(
      {
        userId: null,
      },
      {
        where: {
          userId: ids,
        },
      }
    )
      .then((_) => sendResStatus(res, 204, 'Users deleted'))
      .catch((_) => sendResStatus(res, 500));
  });
};
