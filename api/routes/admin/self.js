const express = require('express');

const router = express.Router();

const adminSelfController = require('../../controllers/admin/self');

router.put('/', adminSelfController.update);

module.exports = router;
