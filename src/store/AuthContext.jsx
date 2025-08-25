import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(() =>{
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
   const isAuthenticated = !!user;
     
  const login = (email, user) => {
    
    const newUser = {email , user};
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

  };

  const logout = () => {
    
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);