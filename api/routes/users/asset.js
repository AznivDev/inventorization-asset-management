const express = require('express');

const router = express.Router();

const userAssetsController = require('../../controllers/users/asset');

router.get('/', userAssetsController.index);

module.exports = router;
