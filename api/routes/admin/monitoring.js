const express = require('express');

const router = express.Router();

const adminMonitoringController = require('../../controllers/admin/monitoring/monitoring');

router.get('/counts', adminMonitoringController.counts);
router.get('/requests', adminMonitoringController.requests);
router.get('/types', adminMonitoringController.types);

module.exports = router;
