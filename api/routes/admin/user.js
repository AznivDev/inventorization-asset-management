const express = require('express');

const router = express.Router();

const adminUserController = require('../../controllers/admin/user');
const { verifySignup } = require('../../middlewares/auth');
const { verifyRole, verifyUpdate, verifyUser, verifyUsers } = require('../../middlewares/admin/user');

router.get('/', adminUserController.index);
router.post('/', [verifySignup, verifyRole], adminUserController.create);
router.get('/:id', adminUserController.show);
router.put('/:id', verifyUpdate, adminUserController.update);
router.put('/:id/assets/assign', adminUserController.assignAsset);
router.delete('/:id', verifyUser, adminUserController.delete);
router.delete('/', verifyUsers, adminUserController.bulkDelete);

module.exports = router;
