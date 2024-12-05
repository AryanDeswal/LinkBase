import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is not logged in

  useEffect(()=>{
    const userToken = window.localStorage.getItem('authorization');
    if(!userToken){
        setIsLoggedIn(false)
    }
    else{
        setIsLoggedIn(true)
    }
  },[window.location.href])



  return (
    <AuthContext.Provider value={{ isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
