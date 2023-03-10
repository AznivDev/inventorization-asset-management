const express = require('express');

const router = express.Router();

const adminRequestController = require('../../controllers/admin/request');

const { verifyRequest, verifyTarget, verifyBulkAction } = require('../../middlewares/request');

router.get('/', adminRequestController.index);
router.put('/:id/users/:userId/approve', [verifyRequest, verifyTarget], adminRequestController.approve);
router.put('/:id/users/:userId/decline', [verifyRequest, verifyTarget], adminRequestController.decline);
router.put('/', verifyBulkAction, adminRequestController.bulkApprove);
router.delete('/', verifyBulkAction, adminRequestController.bulkDecline);

module.exports = router;
