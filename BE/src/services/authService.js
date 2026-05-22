const { OAuth2Client } = require('google-auth-library');
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Cấu hình transporter gửi mail
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.verifyAndLoginGoogle = async (googleToken) => {
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let { data: user, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if (fetchError) throw fetchError;

    let requiresSetup = false;
    let isResume = false; // THÊM BIẾN NHẬN DIỆN TRẠNG THÁI

    // Nếu user chưa tồn tại, tạo mới tạm thời
    if (!user) {
        const { data: newUser, error: insertError } = await supabase
            .from('profiles')
            .insert([{
                email: email,
                username: `user_${googleId.substring(0, 8)}_${Date.now().toString().slice(-4)}`,
                full_name: name,
                password_hash: 'GOOGLE_SSO_NO_PASSWORD'
            }])
            .select()
            .single();

        if (insertError) throw insertError;
        user = newUser;
        requiresSetup = true;
        isResume = false; // Đây là tài khoản mới hoàn toàn
    } else if (user.password_hash === 'GOOGLE_SSO_NO_PASSWORD') {
        requiresSetup = true;
        isResume = true; // Đây là tài khoản đang thiết lập dang dở
    }

    // Nếu tài khoản mới hoặc chưa setup, bắt buộc chạy qua luồng OTP
    if (requiresSetup) {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Gen 6 số
        const expiresAt = new Date(Date.now() + 10 * 60000); // Hết hạn sau 10 phút

        // Lưu vào bảng OTP_Tokens
        await supabase.from('otp_tokens').insert([{
            email: email,
            otp_code: otpCode,
            expires_at: expiresAt.toISOString()
        }]);

        // Gửi Mail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'AI StudyHub - Your Verification Code',
            text: `Mã xác thực của bạn là: ${otpCode}. Mã sẽ hết hạn sau 10 phút.`
        });

        // TRẢ VỀ KÈM THEO CỜ isResume CHO FRONTEND
        return { email, requiresOTP: true, isResume: isResume };
    }

    // Nếu đã hoàn tất setup trước đó -> Cấp token login luôn
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, accessToken, requiresSetup: false, requiresOTP: false };
};