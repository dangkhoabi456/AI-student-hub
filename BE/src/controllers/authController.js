const authService = require('../services/authService');

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const result = await authService.verifyAndLoginGoogle(token);
        
        res.status(200).json({ 
            status: 'success', 
            data: result 
        });
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Token Google không hợp lệ' });
    }
};