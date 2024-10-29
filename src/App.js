import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from "./Components/Home";
// import ProtectedRoute from './Components/ProtectedRoute';
import LoginForm from './Components/Login/Login';
import SignupForm from './Components/Login/Signup';
import OtpVerification from './Components/Login/OtpVerification';
import ShowInteriorProject from './Components/Dashboard/ShowInteriorProject';
import ShowArchitecture from './Components/Dashboard/ShowArchitecture';
import NotFound from './Components/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
          
              <Home />
            
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/show/:projectId" element={<ShowInteriorProject />} />
        <Route path="/shows/:projectId" element={<ShowArchitecture />} />
        <Route path="*" element={<NotFound />} />
         {/* Add the Signup Route */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
