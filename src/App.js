import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Components/Home";
import LoginForm from "./Components/Login/Login";
import SignupForm from "./Components/Login/Signup";
import OtpVerification from "./Components/Login/OtpVerification";
import ShowInteriorProject from "./Components/Dashboard/ShowInteriorProject";
import ShowArchitecture from "./Components/Dashboard/ShowArchitecture";
import NotFound from "./Components/NotFound";
import AdminLogin from "./Components/Login/AdminLogin";
import AdminDashboard from "./admin/adminDashboard";
import ForgetPassword from "./forget/ForgetPassword";
import { AdminProvider } from "./context/AdminContext";
import "./App.css";
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login on initial load
    navigate("/login");

    // Disable context menu (right-click)
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);

    // Disable Print Screen key
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        alert("Screenshot capture is disabled!");
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Add a watermark to discourage screenshots */}
      <div className="watermark">
        <AuthProvider>
          <AdminProvider>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
              <Route path="/show/:projectId" element={<ShowInteriorProject />} />
              <Route path="/shows/:projectId" element={<ShowArchitecture />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
