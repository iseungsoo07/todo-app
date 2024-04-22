import { createContext, useContext, useState } from "react";

// Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Put some state in the context
// Share the created context with other components

// 다른 컴포넌트로 context 제공
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(username, password) {
    if (username === "in28minutes" && password === "1234") {
      setIsAuthenticated(true);

      return true;
    } else {
      setIsAuthenticated(false);

      return false;
    }
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
