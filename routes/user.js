const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const validator = require('../middleware/email');

router.post('/signup', validator, password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
