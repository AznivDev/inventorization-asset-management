const { verifyToken } = require('../middlewares/auth');
const { isAdmin, isNotAdmin } = require('../middlewares/admin/admin');
const { verifyTarget } = require('../middlewares/request');

const etcRouter = require('../routes/etc');
const userRouter = require('../routes/user');
const userRequestsRouter = require('../routes/users/request');
const adminRequestRouter = require('../routes/admin/request');
const adminAuthRouter = require('../routes/admin/auth');
const adminUserRouter = require('../routes/admin/user');
const adminAssetRouter = require('../routes/admin/asset');
const adminRoleRouter = require('../routes/admin/role');
const adminSelfRouter = require('../routes/admin/self');
const authRouter = require('../routes/auth');
const adminMonitoringRouter = require('../routes/admin/monitoring');

const userAssetsRouter = require('../routes/users/asset');

exports.configureRouter = (app) => {
  // Auth
  app.use('/auth', authRouter);

  // Admin
  app.use('/admin/auth', adminAuthRouter);
  app.use('/admin/users', [verifyToken, isAdmin], adminUserRouter);
  app.use('/admin/assets', [verifyToken, isAdmin], adminAssetRouter);
  app.use('/admin/roles', [verifyToken, isAdmin], adminRoleRouter);
  app.use('/admin/self', [verifyToken, isAdmin], adminSelfRouter);
  app.use('/admin/requests', [verifyToken, isAdmin], adminRequestRouter);
  app.use('/admin/monitoring', [verifyToken, isAdmin], adminMonitoringRouter);

  // User

  app.use('/', etcRouter);
  app.use(verifyToken, userRouter);
  app.use('/requests', [verifyToken, isNotAdmin], userRequestsRouter);
  app.use('/assets', [verifyToken, isNotAdmin], userAssetsRouter);
};
