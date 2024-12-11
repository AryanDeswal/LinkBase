import { artisticFilter } from "@cloudinary/url-gen/actions/effect";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetEmail() {
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userEmail, setUserEmail] = useState(null); // Store the retrieved email
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        const phonePattern = /^[0-9]{10}$/; // Example: Validating 10-digit phone numbers

        if (!phone) newErrors.phone = 'Phone number is required';
        else if (!phonePattern.test(phone)) newErrors.phone = 'Invalid phone number, it must be 10 digits';
    
        setErrors(newErrors);
    
        // Show alert with all errors
        if (Object.keys(newErrors).length > 0) {
            alert(Object.values(newErrors).join('\n'));
            return false;
        }
    
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                // Send phone number to backend to find the email associated with it
                const response = await fetch('https://projectassoicate.onrender.com/api/auth/forgot-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone }),
                });

                if (!response.ok) throw new Error('User not found');
                
                const data = await response.json();
                alert(data.message)
                if (data.email) {
                    setUserEmail(data.email); // Set the retrieved email
                }
                // alert('Email found! Check below.');

            } catch (error) {
                setErrors({ api: 'No user found with this phone number.' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div>
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-4"
                style={{
                    backgroundImage: `url('back.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm bg-opacity-90">
                    <h1 className="text-3xl font-bold mb-6 text-center">Find Your Email</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                Enter Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full p-2 border rounded-md ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 rounded-md text-white ${
                                isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Find Email"}
                        </button>
                    </form>

                    {userEmail && (
                        <div className="mt-4 text-center">
                            <p className="text-green-500">Your Email: {userEmail}</p>
                        </div>
                    )}

                    {errors.api && (
                        <div className="mt-4 text-center">
                            <p className="text-red-500">{errors.api}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgetEmail;
