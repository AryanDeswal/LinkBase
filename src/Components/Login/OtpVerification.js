import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    
    // Validate OTP
    if (!otp) {
      setError('OTP is required');
      return;
    }
    
    // Send OTP to backend for verification
    // Assuming `verifyOtp` is an API call
    console.log(`Verifying OTP for email: ${email}`);

    // Simulate successful OTP verification
    alert('OTP verified successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
        <h1 className="text-3xl font-bold mb-6 text-center">OTP Verification</h1>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md border-gray-300"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
