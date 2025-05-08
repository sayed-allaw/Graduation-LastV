import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useData } from "../context/DataContext";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import imageUrls from "../assets/images/image-urls";

// Animation definitions
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Dashboard = () => {
  const { dashboardData, notifications, updateDashboardData } = useData();

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your API key
  });

  // Update data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateDashboardData();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateDashboardData]);

  // Map center (Cairo)
  const center = {
    lat: 30.0444,
    lng: 31.2357,
  };

  return (
    <PageTransition>
      <Container fluid>
        {/* Overview cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <motion.div variants={fadeIn}>
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overview-card bg-primary text-white border-0 shadow">
                    <Card.Body className="p-4">
                      <div className="icon mb-3">
                        <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                      </div>
                      <div className="count mb-2">
                        {dashboardData.totalIssues}
                      </div>
                      <div className="title">Total Issues</div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
            <Col md={4} className="mb-3">
              <motion.div variants={fadeIn}>
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overview-card bg-success text-white border-0 shadow">
                    <Card.Body className="p-4">
                      <div className="icon mb-3">
                        <i className="bi bi-people-fill fs-1"></i>
                      </div>
                      <div className="count mb-2">
                        {dashboardData.activeUsers}
                      </div>
                      <div className="title">Active Users</div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
            <Col md={4} className="mb-3">
              <motion.div variants={fadeIn}>
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overview-card bg-info text-white border-0 shadow">
                    <Card.Body className="p-4">
                      <div className="icon mb-3">
                        <i className="bi bi-geo-alt-fill fs-1"></i>
                      </div>
                      <div className="count mb-2">
                        {dashboardData.roadsMonitored}
                      </div>
                      <div className="title">Monitored Roads</div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card.Title className="mb-4 d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill text-primary me-2 fs-4"></i>
                      <span className="fs-4">Damage Locations</span>
                    </Card.Title>
                  </motion.div>
                  <motion.div
                    className="map-container overflow-hidden"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    style={{ borderRadius: "12px" }}
                  >
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={center}
                        zoom={12}
                        options={{
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: true,
                          zoomControl: true,
                          styles: [
                            {
                              featureType: "all",
                              elementType: "labels.text.fill",
                              stylers: [
                                { color: "#7c93a3" },
                                { lightness: "-10" },
                              ],
                            },
                            {
                              featureType: "administrative.country",
                              elementType: "geometry",
                              stylers: [{ visibility: "on" }],
                            },
                            {
                              featureType: "administrative.province",
                              elementType: "geometry.stroke",
                              stylers: [
                                { color: "#ffffff" },
                                { visibility: "on" },
                                { weight: 1 },
                              ],
                            },
                          ],
                        }}
                      >
                        {/* Damage location marker */}
                        <Marker
                          position={{ lat: 30.05, lng: 31.24 }}
                          title="Large Pothole"
                          icon={{
                            url: imageUrls.map.marker,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        />
                        <Marker
                          position={{ lat: 30.06, lng: 31.23 }}
                          title="Road Crack"
                          icon={{
                            url: imageUrls.map.pin,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        />
                        <Marker
                          position={{ lat: 30.04, lng: 31.25 }}
                          title="Dangerous Bump"
                          icon={{
                            url: imageUrls.map.marker,
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                        />
                      </GoogleMap>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card.Title className="mb-4 d-flex align-items-center">
                      <i className="bi bi-bell-fill text-warning me-2 fs-4"></i>
                      <span className="fs-4">Latest Notifications</span>
                    </Card.Title>
                  </motion.div>
                  {notifications.length > 0 ? (
                    <motion.ul
                      className="list-group"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {notifications.slice(0, 5).map((notification, index) => (
                        <motion.li
                          key={notification.id}
                          className="list-group-item border-0 mb-2 rounded"
                          variants={fadeIn}
                          custom={index}
                          whileHover={{
                            backgroundColor: "#f8f9fa",
                            x: 5,
                          }}
                        >
                          <small className="text-muted d-block mb-1">
                            <i className="bi bi-clock me-1"></i>
                            {notification.timestamp}
                          </small>
                          <div className="fw-medium">
                            {notification.message}
                          </div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.p
                      className="text-center my-4 text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <i className="bi bi-inbox fs-4 d-block mb-2"></i>
                      No notifications at the moment
                    </motion.p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Row>
            <Col>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card.Title className="mb-4 d-flex align-items-center">
                      <i className="bi bi-link-45deg text-primary me-2 fs-4"></i>
                      <span className="fs-4">Quick Links</span>
                    </Card.Title>
                  </motion.div>
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    <a
                      href="/reports"
                      className="btn btn-primary px-4 py-3"
                      style={{ borderRadius: "12px" }}
                    >
                      <i className="bi bi-file-earmark-text me-2 fs-5"></i>
                      Reports
                    </a>
                    <a
                      href="/users"
                      className="btn btn-success px-4 py-3"
                      style={{ borderRadius: "12px" }}
                    >
                      <i className="bi bi-people me-2 fs-5"></i>
                      Users
                    </a>
                    <a
                      href="/statistics"
                      className="btn btn-info text-white px-4 py-3"
                      style={{ borderRadius: "12px" }}
                    >
                      <i className="bi bi-bar-chart me-2 fs-5"></i>
                      Statistics
                    </a>
                    <a
                      href="/settings"
                      className="btn btn-secondary px-4 py-3"
                      style={{ borderRadius: "12px" }}
                    >
                      <i className="bi bi-gear me-2 fs-5"></i>
                      Settings
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </PageTransition>
  );
};

export default Dashboard;
