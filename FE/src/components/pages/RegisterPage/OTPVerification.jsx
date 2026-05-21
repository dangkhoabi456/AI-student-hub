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
      setErrorMsg(error.response?.data?.message || "OTP không hợp lệ.");
    }
  };

  return (
    <div className="register_page">
      <form className="register_form" onSubmit={handleSubmit} style={{ backgroundColor: '#fff8e7', padding: '30px', borderRadius: '15px' }}>
        <p className="register_title">Xác minh Email</p>
        <p className="register_message">Vui lòng nhập mã 6 số đã được gửi tới <b>{email}</b></p>
        <FormInput type="text" value={otp} onChange={(e) => setOtp(e.target.value)} label="Mã OTP" />
        {errorMsg && <p style={{ color: "red", fontSize: "14px" }}>{errorMsg}</p>}
        <button className="register_submit" style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff' }} type="submit">Xác nhận OTP</button>
      </form>
    </div>
  );
}

export default OTPVerification;