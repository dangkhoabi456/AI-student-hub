import React, { useState } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"; // Thêm import GoogleOAuthProvider
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Khai báo trực tiếp Client ID tại đây
const GOOGLE_CLIENT_ID = "816282057609-4clrdj4f4mp1jh72m40ffaf04fne6vhe.apps.googleusercontent.com";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý khi bấm nút Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("[DRY RUN] Payload:", { username, password });

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ Username/Email và Password!");
      return;
    }

    try {
      const res = await axios.post("http://ai-student-hub-xtw6.onrender.com/api/auth/login", {
        username,
        password
      });

      const accessToken = res.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      navigate('/dashboard');

    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      const errorMsg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      alert(errorMsg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const res = await axios.post("https://ai-student-hub-xtw6.onrender.com/api/auth/google", {
        token: googleToken
      });

      const responseData = res.data.data;

      if (responseData.requiresOTP) {
        if (responseData.isResume) {
          alert("Bạn có quá trình thiết lập tài khoản chưa hoàn tất. Hệ thống đang chuyển đến trang tiếp tục!");
        } else {
          alert("Email này chưa đăng ký tài khoản. Hệ thống tự động chuyển sang luồng đăng ký mới!");
        }
        navigate('/verify-otp', { state: { email: responseData.email } });
      } else {
        localStorage.setItem("accessToken", responseData.accessToken);
        // alert("Log in successfully!");
        navigate('/dashboard');
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
      <form className="login_form" onSubmit={handleSubmit}>
        <p className="login_title">Log in</p>
        <div className="login_flex">
          <FormInput
            type="text"
            label="Username or gmail"
            className="username_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormInput
            type="password"
            label="Password"
            className="password_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login_submit" type="submit">Submit</button>

        <p className="login_message">
          Didn't have an account?{' '}
          <span onClick={() => navigate('/register')} style={{ color: '#0056b3', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}>
            Create one
          </span>
        </p>

        <p className="forgot_password_message"><a href="/forgot-password">Forgot password?</a></p>

        <div className="account_link_container">
          <p className="link_account_text">Or with</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {/* Bọc Provider quanh nút GoogleLogin */}
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap={false} />
            </GoogleOAuthProvider>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;