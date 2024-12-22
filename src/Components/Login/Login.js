import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    navigate(token ? '/home' : '/');
  }, [navigate]);

  const validate = () => {
    const { email, password } = formData;
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(email)) newErrors.email = 'Invalid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors in the form.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://projectassoicate-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      localStorage.setItem('authorization', data.token);
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-4"
      style={{
        backgroundImage: `url('back.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm bg-opacity-90">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {field === 'email' ? 'Enter Email' : 'Password'}
              </label>
              <input
                type={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors[field] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              isSubmitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline focus:outline-none">
              Sign up
            </button>
          </p>
          <p className="text-sm">
            Log In Admin{' '}
            <button onClick={() => navigate('/adminlogin')} className="text-blue-500 hover:underline focus:outline-none">
              Login Admin
            </button>
          </p>
          <p className="text-sm">
            <Link to="/forgetPassword" className="text-blue-500 hover:underline focus:outline-none">
              Forget Password
            </Link>
          </p>
          <p className="text-sm">
            <Link to="/forgetEmail" className="text-blue-500 hover:underline focus:outline-none">
              Forget Email
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
