import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
// useAuth is no longer needed here

const Layout = () => {
  // No need to check isLoggedIn here
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Page title
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    return title || "Dashboard";
  };

  // Update document title when route changes
  useEffect(() => {
    document.title = `Trackon - ${getPageTitle()}`;
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // إعادة فتح الشريط الجانبي عند تغيير الصفحة
  useEffect(() => {
    setSidebarOpen(true);
  }, [location.pathname]);

  // isLoggedIn check is now handled by ProtectedRoute

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
