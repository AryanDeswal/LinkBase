import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      alert('Email not found. Redirecting to the previous page.');
      navigate(-1);
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // Validate OTP length and numeric value
    if (!otp) {
      setError('OTP is required');
      return;
    } else if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://projectassoicate.onrender.com/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode: otp }), // Send email and OTP
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server
        alert(data.message || 'Incorrect OTP, please try again.'); // Show alert for incorrect OTP
        setError(data.message || 'Verification failed');
        setLoading(false); // Reset loading state
        return;
      }

      alert(data.message); // Show success message
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Error during OTP verification:', err);
      setError('An error occurred. Please try again.'); // Set error state
    } finally {
      setLoading(false); // Reset loading state
    }
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
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
