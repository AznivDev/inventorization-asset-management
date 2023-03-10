const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const { verifySignin } = require('../middlewares/auth');

router.post('/signin', verifySignin, authController.signin);

module.exports = router;
