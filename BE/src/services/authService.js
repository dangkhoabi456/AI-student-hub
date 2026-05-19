const { OAuth2Client } = require('google-auth-library');
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyAndLoginGoogle = async (googleToken) => {
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let { data: user, error: fetchError } = await supabase
        .from('Profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle();
    if (fetchError) throw fetchError;

    let requiresSetup = false;

    if (!user) {
        const { data: newUser, error: insertError } = await supabase
            .from('Profiles')
            .insert([{
                email: email,
                username: `user_${googleId.substring(0, 8)}`,
                full_name: name,
                password_hash: 'GOOGLE_SSO_NO_PASSWORD'
            }])
            .select()
            .single();

        if (insertError) throw insertError;
        user = newUser;
        requiresSetup = true;
    } else if (user.password_hash === 'GOOGLE_SSO_NO_PASSWORD') {
        requiresSetup = true;
    }

    const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: 'User' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, accessToken, requiresSetup };
};

exports.registerUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;

    const { data: existingUser } = await supabase
        .from('Profiles')
        .select('id')
        .eq('email', email)
        .single();

    if (existingUser) {
        throw new Error('Email này đã được sử dụng.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const fullName = `${firstName} ${lastName}`.trim();
    const username = `user_${Date.now().toString().slice(-8)}`;

    const { data: newUser, error: insertError } = await supabase
        .from('Profiles')
        .insert([{
            email: email,
            username: username,
            full_name: fullName,
            password_hash: passwordHash
        }])
        .select()
        .single();

    if (insertError) throw insertError;

    return newUser;
};