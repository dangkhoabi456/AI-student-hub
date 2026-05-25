import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import các Component
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import RegisterPage from './components/pages/RegisterPage/RegisterGoogle.jsx';
import CompleteProfile from "./components/pages/RegisterPage/CompleteProfile.jsx";
import OTPVerification from "./components/pages/RegisterPage/OTPVerification.jsx"; 
import DashboardLayout from "./components/layout/Dashboard/Dashboard.jsx";
import ForgotPassword from "./components/pages/LoginPage/ForgotPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Mặc định vào thẳng trang Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;