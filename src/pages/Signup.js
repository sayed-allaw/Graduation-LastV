import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [error, setError] = useState("");

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    // Create account
    const success = signup(
      formData.username,
      formData.email,
      formData.password
    );

    if (success) {
      // Show success message and redirect user to login page
      alert("Account created successfully! Please login.");
      navigate("/login");
    } else {
      setError(
        "An error occurred while creating the account. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <div className="text-center mb-4">
            <h2>Create New Account</h2>
            <p className="text-muted">Road Damage Detection System</p>
          </div>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Create Account
            </Button>

            <div className="text-center">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/welcome">Back to Home Page</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
