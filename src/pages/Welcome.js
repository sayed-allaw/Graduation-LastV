import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import imageUrls from "../assets/images/image-urls";

// Animation definitions
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Welcome = () => {
  return (
    <PageTransition>
      <div className="welcome-page">
        <motion.header
          className="welcome-header text-center py-5 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `linear-gradient(rgba(7, 56, 156, 0.8), rgba(7, 56, 156, 0.9)), url(${imageUrls.backgrounds.welcome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <Container>
            <motion.h1
              className="display-4 mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <Image
                  src={imageUrls.logos.main}
                  alt="Trackon Logo"
                  width={70}
                  height={70}
                  className="me-2"
                />
                Trackon
              </div>
            </motion.h1>
            <motion.p
              className="lead mb-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Integrated platform for managing, monitoring road conditions,
              tracking and repairing damages
            </motion.p>
            <motion.div
              className="mt-5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Link to="/login">
                <Button
                  variant="light"
                  size="lg"
                  className="me-3 px-4 py-3 shadow-sm"
                  style={{ borderRadius: "30px" }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3"
                  style={{ borderRadius: "30px" }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </Container>
        </motion.header>

        <section
          className="features py-5"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Container>
            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="text-primary fw-bold mb-3">OUR FEATURES</h6>
              <h2 className="display-5 fw-bold mb-4">System Features</h2>
              <p
                className="lead text-muted mx-auto"
                style={{ maxWidth: "700px" }}
              >
                An integrated system that combines AI technologies and advanced
                analytics to provide effective solutions for road damage
                management
              </p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Row>
                <Col md={4} className="mb-4">
                  <motion.div variants={fadeIn}>
                    <Card className="h-100 shadow border-0 feature-card">
                      <Card.Body className="text-center p-4">
                        <div
                          className="feature-icon mb-4 d-inline-block p-3 rounded-circle bg-primary bg-opacity-10"
                          style={{
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-camera-fill fs-1 text-primary"></i>
                        </div>
                        <Card.Title className="fs-4 mb-3">
                          Damage Detection
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Advanced system for detecting road damage using AI
                          technologies and image processing
                        </Card.Text>
                        <div className="mt-3">
                          <Link
                            to="/login"
                            className="text-primary fw-bold text-decoration-none"
                          >
                            Discover More{" "}
                            <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
                <Col md={4} className="mb-4">
                  <motion.div variants={fadeIn}>
                    <Card className="h-100 shadow border-0 feature-card">
                      <Card.Body className="text-center p-4">
                        <div
                          className="feature-icon mb-4 d-inline-block p-3 rounded-circle bg-success bg-opacity-10"
                          style={{
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-geo-alt-fill fs-1 text-success"></i>
                        </div>
                        <Card.Title className="fs-4 mb-3">
                          Location Tracking
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Identifying damage locations on the map and tracking
                          repair status in real-time
                        </Card.Text>
                        <div className="mt-3">
                          <Link
                            to="/login"
                            className="text-success fw-bold text-decoration-none"
                          >
                            Discover More{" "}
                            <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
                <Col md={4} className="mb-4">
                  <motion.div variants={fadeIn}>
                    <Card className="h-100 shadow border-0 feature-card">
                      <Card.Body className="text-center p-4">
                        <div
                          className="feature-icon mb-4 d-inline-block p-3 rounded-circle bg-info bg-opacity-10"
                          style={{
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className="bi bi-graph-up fs-1 text-info"></i>
                        </div>
                        <Card.Title className="fs-4 mb-3">
                          Reports & Statistics
                        </Card.Title>
                        <Card.Text className="text-muted">
                          Advanced analytics and detailed reports to help
                          decision makers prioritize maintenance
                        </Card.Text>
                        <div className="mt-3">
                          <Link
                            to="/login"
                            className="text-info fw-bold text-decoration-none"
                          >
                            Discover More{" "}
                            <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </section>

        <section className="how-it-works py-5 bg-light">
          <Container>
            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="text-primary fw-bold mb-3">WORKFLOW</h6>
              <h2 className="display-5 fw-bold mb-4">How The System Works</h2>
              <p
                className="lead text-muted mx-auto"
                style={{ maxWidth: "700px" }}
              >
                The system works through sequential and integrated steps to
                ensure accurate detection of road damage and follow-up repairs
              </p>
            </motion.div>
            <Row className="align-items-center">
              <Col md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img
                    src={imageUrls.backgrounds.dashboard}
                    alt="How the system works"
                    className="img-fluid rounded shadow"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div
                  className="steps"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div className="step d-flex mb-4" variants={fadeIn}>
                    <div className="step-number me-3">
                      <div
                        className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <span className="fw-bold fs-4 text-primary">1</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="fw-bold">Image Capture</h4>
                      <p className="text-muted">
                        Road images are captured using cameras mounted on
                        vehicles or through the mobile application
                      </p>
                    </div>
                  </motion.div>
                  <motion.div className="step d-flex mb-4" variants={fadeIn}>
                    <div className="step-number me-3">
                      <div
                        className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <span className="fw-bold fs-4 text-success">2</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="fw-bold">Image Analysis</h4>
                      <p className="text-muted">
                        The system analyzes images using artificial intelligence
                        algorithms to detect damages
                      </p>
                    </div>
                  </motion.div>
                  <motion.div className="step d-flex mb-4" variants={fadeIn}>
                    <div className="step-number me-3">
                      <div
                        className="d-flex align-items-center justify-content-center bg-info bg-opacity-10 rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <span className="fw-bold fs-4 text-info">3</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="fw-bold">Report Generation</h4>
                      <p className="text-muted">
                        Detailed reports about damages are generated and their
                        locations are identified on the map
                      </p>
                    </div>
                  </motion.div>
                  <motion.div className="step d-flex" variants={fadeIn}>
                    <div className="step-number me-3">
                      <div
                        className="d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <span className="fw-bold fs-4 text-warning">4</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="fw-bold">Repair Monitoring</h4>
                      <p className="text-muted">
                        Repair operations are monitored and damage status is
                        updated in the system
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        <motion.footer
          className="bg-dark text-white py-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "50px" }}
        >
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                <motion.div
                  className="mb-3 d-flex align-items-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image
                    src={imageUrls.logos.small}
                    alt="Trackon Logo"
                    width={40}
                    height={40}
                    className="me-2"
                  />
                  <h4 className="mb-0">Trackon</h4>
                </motion.div>
                <motion.p
                  className="mb-0 text-white-50"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  © 2025 Trackon
                </motion.p>
              </Col>
              <Col md={6} className="text-center text-md-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link to="/login">
                    <Button
                      variant="outline-light"
                      className="me-2 px-4"
                      style={{ borderRadius: "30px" }}
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="primary"
                      className="px-4"
                      style={{ borderRadius: "30px" }}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Sign Up
                    </Button>
                  </Link>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </motion.footer>
      </div>
    </PageTransition>
  );
};

export default Welcome;
