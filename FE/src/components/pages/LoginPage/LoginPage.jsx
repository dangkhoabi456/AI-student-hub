import React, { useState } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý khi bấm nút Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload

    // In ra vùng nhớ chuẩn bị gửi đi
    console.log("[DRY RUN] Payload:", { username, password });

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ Username/Email và Password!");
      return;
    }

    try {
      // Bắn request POST lên API đăng nhập của Backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      // Trích xuất Access Token từ vùng nhớ Response
      const accessToken = res.data.data.accessToken;

      // Cấp phát Token vào Local Storage của trình duyệt
      localStorage.setItem("accessToken", accessToken);

      navigate('/dashboard'); // Chuyển trang

    } catch (error) {
      // Bắt lỗi từ Backend trả về (mã 400, 401, 500...)
      console.error("Lỗi đăng nhập:", error);
      const errorMsg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      alert(errorMsg);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleToken,
      });

      const responseData = res.data.data;

      if (responseData.requiresOTP) {
        if (responseData.isResume) {
          alert("Bạn có quá trình thiết lập tài khoản chưa hoàn tất. Hệ thống đang chuyển đến trang tiếp tục!");
        } else {
          alert("Email này chưa đăng ký tài khoản. Hệ thống tự động chuyển sang luồng đăng ký mới!");
        }
        // Truyền email vào state của Route
        navigate('/verify-otp', { state: { email: responseData.email } });
      } else {
        localStorage.setItem("accessToken", responseData.accessToken);
        alert("Log in successfully!");
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
      {/* 3. Gắn hàm handleSubmit vào sự kiện của form */}
      <form className="login_form" onSubmit={handleSubmit}>
        <p className="login_title">Log in</p>
        <div className="login_flex">
          <FormInput
            type="text"
            label="Username or gmail"
            className="username_input"
            // 4. Liên kết dữ liệu 2 chiều cho input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormInput
            type="password"
            label="Password"
            className="password_input"
            // 4. Liên kết dữ liệu 2 chiều cho input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login_submit" type="submit">Submit</button>

        {/* ... (Phần UI bên dưới giữ nguyên) ... */}
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
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap={false} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;