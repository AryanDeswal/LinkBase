import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://projectassoicate-1.onrender.com/api/auth/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        if (!response.ok) throw new Error("Failed to send reset email");
        const data = await response.json();
        console.log(data);
        setErrors({});
        alert("Password reset email sent. Please check your email.");
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
              Enter Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
            {isSubmitting ? "Submitting..." : "Send Reset Password Email"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
