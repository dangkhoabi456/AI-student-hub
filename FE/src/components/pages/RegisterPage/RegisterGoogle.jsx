import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Register.css";

function Register({ onSwitchToLogin, onRequireSetup }) {
  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      
      // Gửi Google Token lên backend để xác thực/tạo tài khoản tạm thời
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleToken,
      });

      // Lưu trữ JWT Token nội bộ vào Local Storage
      localStorage.setItem("accessToken", res.data.data.accessToken);
      
      // Bộ nhớ RAM đọc cờ trạng thái 'requiresSetup' từ Backend trả về
      if (res.data.data.requiresSetup) {
        // Kích hoạt callback chuyển View sang trang CompleteProfile, truyền kèm Email
        onRequireSetup(res.data.data.user.email); 
      } else {
        // Nếu là tài khoản cũ đã thiết lập xong, vào thẳng Dashboard
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