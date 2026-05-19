const { OAuth2Client } = require('google-auth-library');
const supabase = require('../config/supabase'); //Câu lệnh chứa đựng cấu hình kết nối Supabase để truy cập cơ sở dữ liệu Profiles
const jwt = require('jsonwebtoken'); //Câu lệnh chứa đựng thư viện jsonwebtoken để tạo JWT nội bộ cho hệ thống AI StudyHub

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyAndLoginGoogle = async (googleToken) => {
    // 1. Gửi token lên Google để xác minh (Xác thực chữ ký số)
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,  
    });
    
    // 2. Trích xuất Payload (Dữ liệu đã giải mã)
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload; // 'sub' là ID duy nhất của Google

    // 3. Thực thi SQL: Kiểm tra xem user này đã có trong bảng Profiles chưa
    let { data: user, error: fetchError } = await supabase
        .from('Profiles')
        .select('*')
        .eq('email', email)
        .single();

    // 4. Nếu chưa có (Lần đầu đăng nhập) -> Tự động Insert (Sign up)
    if (!user) {
        const { data: newUser, error: insertError } = await supabase
            .from('Profiles')
            .insert([{ 
                email: email, 
                username: `user_${googleId.substring(0, 8)}`, // Tạo username tạm
                full_name: name,
                password_hash: 'GOOGLE_SSO_NO_PASSWORD' // Không lưu pass vì dùng SSO
            }])
            .select()
            .single();
            
        if (insertError) throw insertError;
        user = newUser;
    }

    // 5. Cấp phát Custom JWT của riêng hệ thống AI StudyHub
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: 'User' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, accessToken };
};