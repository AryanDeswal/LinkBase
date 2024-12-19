import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Components/Home";
// import ProtectedRoute from './Components/ProtectedRoute';
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
import ForgetEmail from "./forget/ForgetEmail";
import ResetPassword from "./forget/ResetPassword";
const App = () => {
  const navigate = useNavigate();

 
  return (
    <>
      <AuthProvider>
        <AdminProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/show/:projectId" element={<ShowInteriorProject />} />
            <Route path="/shows/:projectId" element={<ShowArchitecture />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/forgetEmail" element={<ForgetEmail />} />
            <Route path="/resetpassword" element={<ResetPassword/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </>
  );
};

export default App;
