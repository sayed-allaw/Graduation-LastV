import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Application pages
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";
import Users from "./pages/Users";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";

// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles.css";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public pages */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected pages */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:id" element={<ReportDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* توجيه المسارات غير الموجودة إلى الصفحة الرئيسية */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
