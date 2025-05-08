import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";

const Layout = ({ title }) => {
  const { isLoggedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Page title
  const getPageTitle = () => {
    return "Trackon";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // إعادة فتح الشريط الجانبي عند تغيير الصفحة
  useEffect(() => {
    setSidebarOpen(true);
  }, [location.pathname]);

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Header title={getPageTitle()} toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
