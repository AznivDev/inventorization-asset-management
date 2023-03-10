const { Type, Asset, REQUEST_PENDING, User, Role, Request, REQUEST_APPROVED, REQUEST_REJECTED } = require('../../../db/sequelize');
const { sendResStatus, sendResBody } = require('../../../utils/api');

exports.counts = (_, res) => {
  const counts = {
    assetTypes: 0,
    availableAssets: 0,
    pendingRequests: 0,
    registeredUsers: 0,
    roles: 0,
  };

  const assetTypesPromise = Type.count();
  const availableAssetsPromise = Asset.count({ where: { userId: null } });
  const pendingRequestsPromise = Request.count({ where: { status: REQUEST_PENDING } });
  const registeredUsersPromise = User.count();
  const rolesPromise = Role.count();

  Promise.all([assetTypesPromise, availableAssetsPromise, pendingRequestsPromise, registeredUsersPromise, rolesPromise])
    .then(([types, assets, requests, users, roles]) => {
      counts.assetTypes = types;
      counts.availableAssets = assets;
      counts.pendingRequests = requests;
      counts.registeredUsers = users;
      counts.roles = roles;

      sendResBody(res, 200, counts);
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.requests = (_, res) => {
  const counts = {
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  const pendingRequestsPromise = Request.count({ where: { status: REQUEST_PENDING } });
  const approvedRequestsPromise = Request.count({ where: { status: REQUEST_APPROVED } });
  const rejectedRequestsPromise = Request.count({ where: { status: REQUEST_REJECTED } });

  Promise.all([pendingRequestsPromise, approvedRequestsPromise, rejectedRequestsPromise])
    .then(([pending, approved, rejected]) => {
      counts.pending = pending;
      counts.approved = approved;
      counts.rejected = rejected;

      sendResBody(res, 200, counts);
    })
    .catch((_) => sendResStatus(res, 500));
};

exports.types = (_, res) => {
  Type.findAll({
    attributes: ['id', 'name', 'description'],
    include: [
      {
        model: Asset,
        attributes: ['id'],
      },
    ],
  })
    .then((types) => {
      const groupedAssets = [];

      types.forEach((type) => {
        groupedAssets.push({ id: type.id, assetsCount: type.assets.length, name: type.name, description: type.description });
      });

      sendResBody(res, 200, groupedAssets);
    })
    .catch((_) => sendResStatus(res, 500));
};
