import React from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./LoginPage.css";

function LoginPage({ onSwitchToRegister, onRequireSetup }) {

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: googleToken,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);

      // Nếu tài khoản Google chưa hoàn tất tạo username/password
      if (res.data.data.requiresSetup) {
        onRequireSetup(res.data.data.user.email);
      } else {
        alert("Login Successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Backend authentication error:", error);
      alert("Login failed.");
    }
  };

  return (
    <div className="login_page">
      <form className="login_form" onSubmit={(e) => e.preventDefault()}>
        <p className="login_title">Log in</p>
        <div className="login_flex">
          <FormInput type="text" label="Username or gmail" className="username_input" />
          <FormInput type="password" label="Password" className="password_input" />
        </div>

        <button className="login_submit" type="submit">Submit</button>

        <p className="login_message">
          Didn't have an account?
          <span
            onClick={onSwitchToRegister}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
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
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Google error")} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;