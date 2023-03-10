const express = require('express');

const router = express.Router();
const { verifyCreate, verifyAsset, verifyBulkDelete, verifyTypeBulkDelete, verifyBulkExist } = require('../../middlewares/asset');

const adminAssetTypeController = require('../../controllers/admin/assets/type');
const adminAssetController = require('../../controllers/admin/assets/asset');

router.get('/types', adminAssetTypeController.index);
router.post('/types', adminAssetTypeController.create);
router.put('/types/:id', adminAssetTypeController.update);
router.delete('/types/:id', adminAssetTypeController.delete);
router.delete('/types', verifyTypeBulkDelete, adminAssetTypeController.bulkDelete);

router.get('/', adminAssetController.index);
router.delete('/:id', verifyAsset, adminAssetController.delete);
router.post('/', verifyCreate, adminAssetController.create);
router.post('/bulk', verifyCreate, adminAssetController.createWithCount);
router.put('/unassign', verifyBulkExist, adminAssetController.bulkUnassign);
router.put('/:id', verifyAsset, adminAssetController.update);
router.delete('/', verifyBulkDelete, adminAssetController.bulkDelete);

module.exports = router;
