const express = require('express');

const router = express.Router();

const adminRoleController = require('../../controllers/admin/role');

router.get('/', adminRoleController.index);
router.post('/', adminRoleController.create);
router.put('/:id', adminRoleController.update);
router.delete('/:id', adminRoleController.delete);

module.exports = router;
