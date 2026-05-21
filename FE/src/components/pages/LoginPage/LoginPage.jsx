import React from "react";
import FormInput from "../../common/FormInput/FormInput.jsx"; 
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./LoginPage.css";

// Khai báo nhận hàm onSwitchToRegister và onRequireOTP từ App.jsx gửi xuống
function LoginPage({ onSwitchToRegister, onRequireOTP }) {
  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Gửi token sang Backend Node.js
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleToken,
      });

      const responseData = res.data.data;

      // ĐỒNG BỘ LUỒNG VỚI REGISTER:
      if (responseData.requiresOTP) {
        // Nếu Gmail chưa từng register -> Mặc định backend trả về requiresOTP: true
        alert("Email này chưa đăng ký tài khoản. Hệ thống tự động chuyển sang luồng đăng ký mới!");
        
        // Kích hoạt hàm của App.jsx để đổi currentView sang màn hình nhập OTP
        onRequireOTP(responseData.email);
      } else {
        // Nếu là tài khoản cũ đã hoàn tất setup trước đó
        localStorage.setItem("accessToken", responseData.accessToken);
        alert("Log in successfully!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Lỗi xác thực Google với Backend:", error);
      alert("Log in failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.log("Người dùng đóng popup hoặc có lỗi xảy ra từ phía Google");
  };

  return (
    <div className="login_page">
      <form className="login_form" onSubmit={(e) => e.preventDefault()}>
        <p className="login_title">Log in</p>
        <div className="login_flex">
          <FormInput
            type="text"
            label="Username or gmail"
            className="username_input"
          />

          <FormInput
            type="password"
            label="Password"
            className="password_input"
          />
        </div>

        <button className="login_submit" type="submit">Submit</button>

        <p className="login_message">
          Didn't have an account?{' '}
          <span
            onClick={onSwitchToRegister} // Gọi trực tiếp hàm destructuring từ props
            style={{ color: '#0056b3', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
          >
            Create one
          </span>
        </p>
        
        <p className="forgot_password_message">
          <a href="/forgot-password">Forgot password?</a>
        </p>

        <div className="account_link_container">
          <p className="link_account_text">Or with</p>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false} 
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;