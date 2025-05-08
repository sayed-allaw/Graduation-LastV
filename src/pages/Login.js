import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    if (!formData.username || !formData.password) {
      setError("Please enter username and password");
      return;
    }

    const success = login(formData.username, formData.password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <div className="text-center mb-4">
            <h2>Login</h2>
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

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>

            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/signup">Create a new account</Link>
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

export default Login;
