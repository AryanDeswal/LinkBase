import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function ResetPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const token =  searchParams.get('token');

  const validate = () => {
    if (!newPassword) setErrors({ newPassword: 'Password is required' });
    else if (newPassword.length < 6) setErrors({ newPassword: 'Password must be at least 6 characters long' }); 
    if (!confirmPassword) setErrors({ confirmPassword: 'Confirm Password is required' });
    else if (newPassword !== confirmPassword) setErrors({ confirmPassword: 'Passwords do not match' }); 
    if(errors.newPassword || errors.confirmPassword) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://projectassociate-fld7.onrender.com/api/auth/reset-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token,newPassword }),
          }
        );
        if (!response.ok) throw new Error("Failed to send reset email");
        await response.json();
        setErrors({});
        alert("Password Successfully reseted.");
        navigate("/"); // Redirect to login after success
      } catch (error) {
        setErrors({ api: "Failed to send reset email. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
    
  return (
    <div>
      {" "}
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-4"
        style={{
          backgroundImage: `url('back.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm bg-opacity-90">
          <h1 className="text-3xl font-bold mb-6 text-center">Forget Password</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Enter new Password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Confirm new Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.api && (
            <p className="text-red-500 text-sm mb-4">{errors.api}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
