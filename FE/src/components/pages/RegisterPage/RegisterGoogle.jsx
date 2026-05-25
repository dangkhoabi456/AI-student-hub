import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", { token: googleToken });

      if (res.data.data.requiresOTP) {
        navigate('/verify-otp', { state: { email: res.data.data.email } });
      } else {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        alert("Login Successful!");
        navigate('/dashboard');
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
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Google Auth Error")} />
          </div>
        </div>
        <p className="register_signin">
          Already have an account?
          <span
            onClick={() => navigate('/login')}
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