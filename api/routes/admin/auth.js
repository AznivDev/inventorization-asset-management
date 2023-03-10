const express = require('express');

const router = express.Router();

const adminAuthController = require('../../controllers/admin/auth');
const { verifySignup } = require('../../middlewares/auth');

router.post('/signup', verifySignup, adminAuthController.signup);

module.exports = router;
