const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, } = require('../features/authFunctions');
const sendEmail = require('../utils/sendEmail');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/passwordreset/:resetToken', resetPassword);

router.post("/sendEmail", async (req, res, next) => {
    const { username, content } = req.body;
        
    try {
        sendEmail({
            to: "Ihnsuho0819@gmail.com",
            subject: 'Feedback from ' + username,
            text: content,
        });
        res.status(200).json("Email successfully sent");
    } catch (error) {
    res.status(404).json("Email cannot be sent");
    }
});

module.exports = router;