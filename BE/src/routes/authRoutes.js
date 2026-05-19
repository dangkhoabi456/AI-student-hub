const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/google', authController.googleLogin);
router.post('/verify-otp', authController.verifyOTP);
router.get('/check-username', authController.checkUsername);
router.post('/complete-setup', authController.completeSetup);

module.exports = router;