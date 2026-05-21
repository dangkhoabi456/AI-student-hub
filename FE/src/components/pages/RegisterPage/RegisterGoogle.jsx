import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Register.css";

// THÊM onRequireOTP vào props
function Register({ onSwitchToLogin, onRequireSetup, onRequireOTP }) {

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", { token: googleToken });

      // LUỒNG KIỂM TRA DUY NHẤT
      if (res.data.data.requiresOTP) {
        // Tài khoản mới: Backend yêu cầu OTP -> Chuyển sang màn OTP
        onRequireOTP(res.data.data.email);
      } else {
        // Tài khoản cũ: Đã setup xong -> Lưu token và vào thẳng Dashboard
        localStorage.setItem("accessToken", res.data.data.accessToken);
        alert("Login Successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Backend registration error:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register_page">
      <div className="register_card">
        <p className="register_title">Register</p>
        <p className="register_message">
          Sign up instantly using your Google account to secure and access your profile.
        </p>

        <div className="account_link_container">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Auth Error")}
            />
          </div>
        </div>

        <p className="register_signin">
          Already have an account?
          <span
            onClick={onSwitchToLogin}
            style={{ color: '#0056b3', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px', fontWeight: '500' }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;