const express = require('express');
const router = express.Router();

const etcController = require('../controllers/etc');

router.get('/ping', etcController.ping);

module.exports = router;
