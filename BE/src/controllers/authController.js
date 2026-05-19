const authService = require('../services/authService');
const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

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

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = await authService.registerUser({ firstName, lastName, email, password });
        
        res.status(201).json({ 
            status: 'success', 
            data: result 
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

exports.completeSetup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Kiểm tra tính độc nhất của Username trong database
        const { data: existingUser } = await supabase
            .from('Profiles')
            .select('id')
            .eq('username', username)
            .single();

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Username đã được sử dụng. Vui lòng chọn tên khác.' });
        }

        // Logic gán mật khẩu mặc định nếu bỏ trống dữ liệu từ bộ nhớ RAM đưa xuống
        const finalPassword = (!password || password.trim() === "") ? "abc123" : password;
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(finalPassword, salt);

        const { error: updateError } = await supabase
            .from('Profiles')
            .update({ username: username, password_hash: passwordHash })
            .eq('email', email);

        if (updateError) throw updateError;

        res.status(200).json({ status: 'success', message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};