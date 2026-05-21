const authService = require('../services/authService');
const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const result = await authService.verifyAndLoginGoogle(token);
        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        // THÊM DÒNG NÀY ĐỂ BIẾT LỖI TẠI ĐÂU:
        console.error("🔴 LỖI BACKEND GOOGLE LOGIN:", error);
        res.status(401).json({ status: 'error', message: 'Token Google không hợp lệ', error: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Loại bỏ khoảng trắng thừa nếu người dùng copy/paste dính dấu cách
        const cleanOtp = otp.trim();

        // 2. Tìm OTP trong DB
        const { data: otpRecord, error } = await supabase
            .from('otp_tokens')
            .select('*')
            .eq('email', email)
            .eq('otp_code', cleanOtp)
            // .gte('expires_at  new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(); // Dùng maybeSingle thay vì single để tránh lỗi nếu có >1 record

        // In ra log để debug (bạn kiểm tra Terminal của Backend nếu vẫn lỗi)
        if (error) console.error("🔴 Lỗi truy vấn Supabase OTP:", error);

        if (!otpRecord) {
            return res.status(400).json({ status: 'error', message: 'Mã OTP không hợp lệ hoặc đã hết hạn.' });
        }

        // Xóa OTP sau khi dùng
        await supabase.from('otp_tokens').delete().eq('id', otpRecord.id);

        res.status(200).json({ status: 'success', data: { email, requiresSetup: true } });
    } catch (error) {
        console.error("🔴 Lỗi hệ thống verifyOTP:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.status(400).json({ error: 'Missing username' });

        const { data: existingUser } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .single();

        return res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(500).json({ error: 'Database check failed' });
    }
};

exports.completeSetup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Cấu hình Dry Run kiểm tra Username
        const { data: existingUser } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .neq('email', email) // Bỏ qua record hiện tại của user này
            .maybeSingle();

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Username đã được sử dụng.' });
        }

        // Logic Mật khẩu
        let finalPassword = password;
        if (!password || password.trim() === "") {
            finalPassword = "abc123";
        } else {
            // Validate: >= 8 ký tự, 1 thường, 1 số, 1 đặc biệt
            const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
            if (!regex.test(password)) {
                return res.status(400).json({ status: 'error', message: 'Mật khẩu không đạt yêu cầu bảo mật.' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(finalPassword, salt);

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ username: username, password_hash: passwordHash })
            .eq('email', email);

        if (updateError) throw updateError;

        res.status(200).json({ status: 'success', message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};