import React, { useState } from "react";
import LoginPage from "./LoginPage";
import Register from "./Register";

export default function AuthPage() {
  // State initialization: Default view is 'login'
  const [currentView, setCurrentView] = useState("login");

  // Function to switch memory state
  const toggleView = (viewName) => {
    setCurrentView(viewName);
  };

  return (
    <div className="auth-container">
      {/* Conditional Rendering based on state */}
      {currentView === "login" ? (
        <LoginPage onSwitchToRegister={() => toggleView("register")} />
      ) : (
        <Register onSwitchToLogin={() => toggleView("login")} />
      )}
    </div>
  );
}