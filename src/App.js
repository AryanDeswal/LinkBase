import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import LoginForm from "./Components/Login/Login";
import SignupForm from "./Components/Login/Signup";
import OtpVerification from "./Components/Login/OtpVerification";


const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
      </Routes>
    </div>
  );
};

export default App;