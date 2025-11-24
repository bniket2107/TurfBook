// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     const stored = localStorage.getItem("tb_user");
//     if (stored) setUser(JSON.parse(stored));
//     setIsChecking(false);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("tb_user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("tb_user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {!isChecking && children}
//     </AuthContext.Provider>
//   );
// };

// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("tb_user");
    if (stored) setUser(JSON.parse(stored));
    setIsChecking(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("tb_user", JSON.stringify(userData));  // token is stored properly
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("tb_user");  // ❌ token is inside this only!
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!isChecking && children}
    </AuthContext.Provider>
  );
};

