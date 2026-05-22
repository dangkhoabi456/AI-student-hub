import React, { useState, useEffect } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import axios from "axios";
import "./Register.css";

function CompleteProfile({ email }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameStatus, setUsernameStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kỹ thuật Debounce 500ms để check Username realtime
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.username.trim() !== "") {
        try {
          const res = await axios.get(`http://localhost:5000/api/auth/check-username?username=${formData.username}`);
          if (res.data.exists) {
            setUsernameStatus("❌ Username này đã tồn tại.");
          } else {
            setUsernameStatus("✅ Username hợp lệ.");
          }
        } catch (err) {
          console.error("Lỗi kiểm tra username");
        }
      } else {
        setUsernameStatus("");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation trước khi gửi
    if (!formData.username) return setErrorMsg("Username là bắt buộc!");
    if (usernameStatus.includes("❌")) return setErrorMsg("Vui lòng chọn Username khác.");
    if (!formData.password) return setErrorMsg("Mật khẩu là bắt buộc!");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/complete-setup", {
        email: email,
        username: formData.username,
        password: formData.password
      });

      // Bắt Token từ Backend và lưu vào bộ nhớ trình duyệt
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      // Chuyển thẳng vào Dashboard thay vì về trang chủ
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Lỗi cập nhật.");
    }
  };

  return (
    <div className="register_page">
      <form className="register_card" onSubmit={handleSubmit}>
        <p className="register_title">Hoàn tất hồ sơ</p>

        <FormInput 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          label="Username *" 
          required 
        />
        <span style={{ fontSize: "13px", color: usernameStatus.includes("✅") ? "green" : "red", display: 'block', marginTop: '-15px' }}>
          {usernameStatus}
        </span>

        <p className="register_message" style={{ fontSize: "13px", color: "#7c6a58" }}>
          Mật khẩu cần &gt;= 8 ký tự, 1 chữ thường, 1 số, 1 ký tự đặc biệt.
        </p>
        
        <FormInput 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          label="Password *" 
          required 
        />

        {errorMsg && <p style={{ color: "red", textAlign: "center", fontSize: "14px", margin: "0" }}>{errorMsg}</p>}

        <button className="register_submit" type="submit">Hoàn tất</button>
      </form>
    </div>
  );
}

export default CompleteProfile;