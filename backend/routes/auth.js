const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, } = require('../features/authFunctions');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/passwordreset/:resetToken', resetPassword);

module.exports = router;