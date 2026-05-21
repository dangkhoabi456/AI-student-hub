
import FormInput from "../../common/FormInput/FormInput.jsx"; // Đảm bảo đường dẫn đúng
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  // Hàm xử lý khi người dùng chọn tài khoản Google thành công
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;

      // Gửi token sang Backend Node.js
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleToken,
      });

      // Lưu Token nội bộ của AI StudyHub vào Local Storage
      localStorage.setItem("accessToken", res.data.data.accessToken);

      alert("Log in successfully!");
      // Chuyển hướng người dùng vào trang chủ/dashboard
      window.location.href = "/dashboard";
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
          Didn't have an account? <a href="/register">Create one</a>
        </p>
        <p className="forgot_password_message">
          <a href="/forgot-password">Forgot password?</a>
        </p>

        <div className="account_link_container">
          <p className="link_account_text">Or with</p>

          {/* Nút Google chuẩn của thư viện thay thế cho thẻ SVG cũ */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false} // Bật true nếu muốn hiện popup tự động góc phải màn hình
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;