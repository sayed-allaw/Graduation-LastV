import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import imageUrls from "../assets/images/image-urls";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/welcome");
  };

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="position-relative mb-4">
        <div className="d-flex align-items-center">
          <Image
            src={imageUrls.logos.small}
            alt="Trackon Logo"
            width={40}
            height={40}
            className="me-2"
          />
          <h3 className="sidebar-title mb-0">Trackon</h3>
        </div>
        <Button
          variant="light"
          size="sm"
          className="d-md-none rounded-circle close-sidebar-btn"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <i className="bi bi-x-lg"></i>
        </Button>
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} rounded py-3 px-3`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} rounded py-3 px-3`
            }
          >
            <i className="bi bi-file-earmark-text me-2"></i>
            Reports
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} rounded py-3 px-3`
            }
          >
            <i className="bi bi-people me-2"></i>
            Users
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} rounded py-3 px-3`
            }
          >
            <i className="bi bi-bar-chart me-2"></i>
            Statistics
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""} rounded py-3 px-3`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>

        <li className="nav-item mt-5">
          <Button
            variant="danger"
            className="w-100 py-3"
            style={{ borderRadius: "12px" }}
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
