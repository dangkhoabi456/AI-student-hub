const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/google', authController.googleLogin);
router.post('/register', authController.register);
router.post('/complete-setup', authController.completeSetup);

module.exports = router;