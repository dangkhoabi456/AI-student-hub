import React, { useState, useEffect } from "react";
import FormInput from "../../common/FormInput/FormInput.jsx";
import axios from "axios";
import "./Register.css";

function CompleteProfile({ email, onSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameStatus, setUsernameStatus] = useState(""); // Trạng thái kiểm tra realtime
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kỹ thuật Debounce: Chờ người dùng ngừng gõ 500ms thì mới gọi API
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

    return () => clearTimeout(delayDebounceFn); // Xóa timeout nếu gõ tiếp
  }, [formData.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.username) {
      setErrorMsg("Username là bắt buộc!");
      return;
    }
    if (usernameStatus.includes("❌")) {
      setErrorMsg("Vui lòng chọn Username khác.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/complete-setup", {
        email: email,
        username: formData.username,
        password: formData.password
      });
      alert("Thiết lập thành công! Hãy đăng nhập lại.");
      window.location.href = "/";
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Lỗi cập nhật.");
    }
  };

  return (
    <div className="register_page">
      <form className="register_form" onSubmit={handleSubmit} style={{ backgroundColor: '#fff8e7', padding: '30px', borderRadius: '15px' }}>
        <p className="register_title">Hoàn tất hồ sơ</p>

        <FormInput type="text" name="username" value={formData.username} onChange={handleChange} label="Username" />
        <span style={{ fontSize: "12px", color: usernameStatus.includes("✅") ? "green" : "red", display: 'block', marginTop: '-10px', marginBottom: '10px' }}>
          {usernameStatus}
        </span>

        <p className="register_message" style={{ fontSize: "12px", color: "#666" }}>
          Mật khẩu cần &gt;= 8 ký tự, 1 chữ thường, 1 số, 1 ký tự đặc biệt. <br />
          <b>Lưu ý: Bỏ trống sẽ mặc định là "abc123".</b>
        </p>
        <FormInput type="password" name="password" value={formData.password} onChange={handleChange} label="Password (Tùy chọn)" />

        {errorMsg && <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>{errorMsg}</p>}

        <button className="register_submit" style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff' }} type="submit">Hoàn tất</button>
      </form>
    </div>
  );
}

export default CompleteProfile;