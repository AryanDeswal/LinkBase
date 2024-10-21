import  { useState } from 'react';
// Import your Login component
import LoginForm from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

const Home = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      {isLoggedIn ? (
        <div><Dashboard/></div>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} /> // Pass the setter function to Login component
      )}
    </div>
  );
}

export default Home;