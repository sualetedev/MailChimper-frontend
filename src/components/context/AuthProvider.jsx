import React, { createContext, useState, useEffect } from "react";
const api = import.meta.env.VITE_API_URL;


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if(!token || !user){
        console.log("No hay token o usuario en el local");
        
        setLoading(false);
        return false; 
      }

      const userObj = user;
      const userId = userObj.id;
      console.log(userId);
      const request = await fetch (
      `${api}/api/user/getProfile/` + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      setAuth(response.user); 

    

     
    };
    setLoading(false);

    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth , setAuth, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
    
  );
};
