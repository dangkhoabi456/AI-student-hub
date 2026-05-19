import React, { useState } from "react";
import RegisterPage from "./components/pages/RegisterPage/RegisterGoogle.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import CompleteProfile from "./components/pages/RegisterPage/CompleteProfile.jsx";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [setupEmail, setSetupEmail] = useState(""); 

  const handleSwitchView = (viewName) => {
    setCurrentView(viewName);
  };

  const handleRequireSetup = (email) => {
    setSetupEmail(email);
    handleSwitchView("completeProfile");
  };

  return (
    <div className="app-container">
      {currentView === "login" && (
        <LoginPage 
          onSwitchToRegister={() => handleSwitchView("register")} 
          onRequireSetup={handleRequireSetup}
        />
      )}
      {currentView === "register" && (
        <RegisterPage 
          onSwitchToLogin={() => handleSwitchView("login")} 
          onRequireSetup={handleRequireSetup}
        />
      )}
      {currentView === "completeProfile" && (
        <CompleteProfile 
          email={setupEmail} 
          onSuccess={() => { window.location.href = "/dashboard"; }}
        />
      )}
    </div>
  );
}

export default App;