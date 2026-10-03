import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore the session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("bloodlink_user");
    const token = localStorage.getItem("bloodlink_token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    // Expected backend shape: { token, user: { id, name, email, role } }
    const { token, user: loggedInUser } = res.data;
    localStorage.setItem("bloodlink_token", token);
    localStorage.setItem("bloodlink_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (formData) => {
    const res = await registerUser(formData);
    const { token, user: newUser } = res.data;
    if (token) {
      localStorage.setItem("bloodlink_token", token);
      localStorage.setItem("bloodlink_user", JSON.stringify(newUser));
      setUser(newUser);
    }
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("bloodlink_token");
    localStorage.removeItem("bloodlink_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so pages just do: const { user, login, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}