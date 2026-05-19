 import RegisterGoogle from "./components/pages/RegisterPage/RegisterGoogle.jsx";
// import EnterUserNamePass from "./components/pages/RegisterPage/EnterUserNamePass.jsx";
import HeroSection from "./components/pages/HeroSection/HeroSection.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
function App() {
  return (
    <>
      {/* <RegisterGoogle />
      <EnterUserNamePass /> */}

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterGoogle />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;