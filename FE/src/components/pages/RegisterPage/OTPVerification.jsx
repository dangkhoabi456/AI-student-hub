import React, { useState } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import axios from "axios";
import "./Register.css";

function OTPVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (res.data.data.requiresSetup) {
        onSuccess();
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div className="register_page">
      <form className="register_form" onSubmit={handleSubmit} style={{ backgroundColor: '#fff8e7', padding: '30px', borderRadius: '15px' }}>
        <p className="register_title">Email Verification</p>
        <p className="register_message">Please enter the 6-digit code sent to <b>{email}</b></p>
        <FormInput
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP Code"
        />
        {errorMsg && <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>}
        <button className="register_submit" style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff' }} type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OTPVerification;