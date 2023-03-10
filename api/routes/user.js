const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userSelfController = require('../controllers/users/self');
const { verifyUpdate } = require('../middlewares/user');

router.get('/self', userController.self);
router.put('/self', verifyUpdate, userSelfController.update);

module.exports = router;
