// AuthContext.js
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isAuthenticatedLocal = localStorage.getItem("authenticatedUser") !== null;
    setUser(isAuthenticatedLocal);
  }, []);

  const value = {
    user,
    login: async (username, password) => {
      if (username && password) {
        localStorage.setItem("authenticatedUser", JSON.stringify({ username }));
        setUser(true);
      } else {
        alert("Gagal login: Pastikan semua input diisi.");
      }
    },
    logout: async () => {
      localStorage.removeItem("authenticatedUser");
      setUser(false);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
