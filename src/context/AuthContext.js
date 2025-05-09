import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const AuthContext = createContext();

// Context provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check login status when the app loads
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("userRole");

    if (storedLoginStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUser({ username: storedUsername });

      // Determine if the user is an admin
      if (storedRole === "admin" || storedUsername === "admin") {
        setIsAdmin(true);
      }
    }

    // Remove dark mode if it was previously set
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("darkMode");
  }, []);

  // Login
  const login = (username, password) => {
    // Verify credentials (in production, this should be a server request)
    const isValidCredentials =
      (username === "admin" && password === "1234") ||
      (username === localStorage.getItem("username") &&
        password === localStorage.getItem("password"));

    if (isValidCredentials) {
      // Determine if the user is an admin
      const isUserAdmin = username === "admin";

      setUser({ username });
      setIsLoggedIn(true);
      setIsAdmin(isUserAdmin);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      // Save user role
      if (isUserAdmin) {
        localStorage.setItem("userRole", "admin");
      }

      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    try {
      // Clear login status from localStorage first
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      // We don't remove username and password to allow logging in again

      // Then update state
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);

      console.log("Logged out successfully");
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  // Sign up
  const signup = (username, email, password, role = "user") => {
    // In production, this should be a server request
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("userRole", role);
    return true;
  };

  // Update user information
  const updateUserInfo = (username, currentPassword, newPassword) => {
    const storedPassword = localStorage.getItem("password") || "1234";

    if (currentPassword === storedPassword) {
      if (username) {
        localStorage.setItem("username", username);
        setUser({ ...user, username });
      }

      if (newPassword) {
        localStorage.setItem("password", newPassword);
      }

      return true;
    }

    return false;
  };

  // Dark mode has been removed

  // Values to be provided to components
  const value = {
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    signup,
    updateUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
