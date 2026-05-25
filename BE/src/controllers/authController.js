const authService = require('../services/authService');
const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        // 1. Chuẩn hóa dữ liệu bộ nhớ tuyệt đối
        // Chuyển email về in thường và ép otp về kiểu chuỗi nguyên bản
        const cleanEmail = email.toLowerCase().trim();
        const cleanOtp = String(otp).trim();

        // In ra Terminal của Backend để bạn theo dõi Dry Run trực tiếp
        console.log(`[DRY RUN] Đang kiểm tra: Email="${cleanEmail}", OTP="${cleanOtp}"`);

        // 2. Tìm OTP trong DB với cú pháp chuẩn
        const { data: otpRecord, error } = await supabase
            .from('otp_tokens')
            .select('*')
            .eq('email', cleanEmail)
            .eq('otp_code', cleanOtp)
            .gte('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) console.error("🔴 Lỗi truy vấn Supabase:", error);
        console.log(`[DRY RUN] Record tìm thấy:`, otpRecord);

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

        // 1. Dry Run kiểm tra Username
        const { data: existingUser } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .neq('email', email) // Bỏ qua record hiện tại của user này
            .maybeSingle();

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Username đã được sử dụng.' });
        }

        // 2. Logic Mật khẩu (BẮT BUỘC)
        if (!password || password.trim() === "") {
            return res.status(400).json({ status: 'error', message: 'Mật khẩu là thông tin bắt buộc.' });
        }

        // Validate: >= 8 ký tự, 1 thường, 1 số, 1 đặc biệt
        const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ status: 'error', message: 'Mật khẩu không đạt yêu cầu bảo mật.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Cập nhật dữ liệu và lấy lại id của User để cấp Token
        const { data: updatedUser, error: updateError } = await supabase
            .from('profiles')
            .update({ username: username, password_hash: passwordHash })
            .eq('email', email)
            .select('id, email')
            .single();

        if (updateError) throw updateError;

        // 4. Sinh Access Token để vào thẳng Dashboard
        const accessToken = jwt.sign(
            { userId: updatedUser.id, email: updatedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Cập nhật thành công',
            data: { accessToken } // Trả token về cho Frontend
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Phân giải truy vấn: Tìm kiếm linh hoạt theo Username HOẶC Email
        const { data: user, error } = await supabase
            .from('profiles')
            .select('*')
            .or(`username.eq.${username},email.eq.${username}`)
            .maybeSingle();

        if (error) throw error;

        // Trạng thái: Không tìm thấy con trỏ user
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Tài khoản không tồn tại.' });
        }

        // Trạng thái: Chặn tài khoản chưa setup pass (chỉ mới login Google 1 nửa)
        if (user.password_hash === 'GOOGLE_SSO_NO_PASSWORD') {
            return res.status(401).json({ status: 'error', message: 'Tài khoản này chưa hoàn tất thiết lập mật khẩu. Vui lòng đăng nhập qua Google.' });
        }

        // 2. Phân tích vùng nhớ Password
        // Nạp chuỗi thô (password) và chuỗi hash từ DB (user.password_hash) vào thuật toán bcrypt
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Mật khẩu không chính xác.' });
        }

        // 3. Cấp phát Token
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ status: 'success', data: { accessToken } });
    } catch (error) {
        console.error("🔴 Lỗi hệ thống Login:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const cleanEmail = email.toLowerCase().trim();

        // 1. Truy xuất con trỏ User trong bộ nhớ DB
        const { data: user } = await supabase
            .from('profiles')
            .select('id, email, password_hash')
            .eq('email', cleanEmail)
            .maybeSingle();

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Email này chưa được đăng ký trong hệ thống.' });
        }
        if (user.password_hash === 'GOOGLE_SSO_NO_PASSWORD') {
            return res.status(400).json({ status: 'error', message: 'Tài khoản này đăng nhập bằng Google. Không thể đổi mật khẩu.' });
        }

        // 2. Cấp phát OTP vào bảng otp_tokens
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60000); // 10 phút

        await supabase.from('otp_tokens').insert([{
            email: cleanEmail,
            otp_code: otpCode,
            expires_at: expiresAt.toISOString()
        }]);

        // 3. Khởi tạo cấu trúc gửi Mail (Tái sử dụng config hiện có)
        const transporter = require('nodemailer').createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT) || 2525,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: 'AI StudyHub - Password Reset Code',
            text: `Mã OTP khôi phục mật khẩu của bạn là: ${otpCode}. Mã hết hạn sau 10 phút.`
        });

        res.status(200).json({ status: 'success', message: 'Mã OTP đã được gửi đến email.' });
    } catch (error) {
        console.error("🔴 Lỗi forgotPassword:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};