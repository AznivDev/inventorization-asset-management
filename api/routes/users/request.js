const express = require('express');

const router = express.Router();

const userRequestController = require('../../controllers/users/request');
const { verifyCreate, verifyDelete, verifyBulkDelete } = require('../../middlewares/request');

router.get('/', userRequestController.index);
router.post('/', verifyCreate, userRequestController.create);
router.delete('/:id', verifyDelete, userRequestController.delete);
router.delete('/', verifyBulkDelete, userRequestController.bulkDelete);

module.exports = router;
