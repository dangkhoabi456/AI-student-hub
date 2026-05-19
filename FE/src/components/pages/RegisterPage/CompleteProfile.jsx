import React, { useState } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import axios from "axios";
import "./Register.css";

function CompleteProfile({ email, onSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.username) {
      setErrorMsg("Username là bắt buộc!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/complete-setup", {
        email: email,
        username: formData.username,
        password: formData.password
      });
      alert("Thiết lập thành công!");
      onSuccess(); 
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Lỗi cập nhật.");
    }
  };

  return (
    <div className="register_page">
      <form className="register_form" onSubmit={handleSubmit}>
        <p className="register_title">Hoàn tất hồ sơ</p>
        <p className="register_message">Vui lòng chọn Username độc nhất. Bỏ trống password sẽ mặc định là abc123.</p>
        
        <FormInput type="text" name="username" value={formData.username} onChange={handleChange} label="Username" />
        <FormInput type="password" name="password" value={formData.password} onChange={handleChange} label="Password (Tùy chọn)" />
        
        {errorMsg && <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}
        
        <button className="register_submit" type="submit">Xác nhận</button>
      </form>
    </div>
  );
}

export default CompleteProfile;