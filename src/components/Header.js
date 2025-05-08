import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import imageUrls from "../assets/images/image-urls";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good evening";
    return "Good evening";
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <Button variant="primary" className="me-2" onClick={toggleSidebar}>
          <i className="bi bi-list fs-4"></i> Menu
        </Button>
        <div className="d-flex align-items-center">
          <Image
            src={imageUrls.logos.small}
            alt="Trackon Logo"
            width={40}
            height={40}
            className="me-2"
          />
          <h1 className="mb-0">Trackon</h1>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Button
          variant="outline-danger"
          size="sm"
          className="me-3"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-1"></i>
          Sign out
        </Button>
        <div className="user-info">
          {getGreeting()}, {user?.username || "user"}
        </div>
      </div>
    </header>
  );
};

export default Header;
