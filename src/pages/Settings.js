import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const Settings = () => {
  const { user, updateUserInfo } = useAuth();
  const { notifications, addNotification, clearNotifications } = useData();

  // Form state
  const [accountForm, setAccountForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  const [notificationForm, setNotificationForm] = useState({
    message: "",
  });

  // Notification state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle account form change
  const handleAccountFormChange = (e) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle notification form change
  const handleNotificationFormChange = (e) => {
    const { name, value } = e.target;
    setNotificationForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle account form submission
  const handleAccountSubmit = (e) => {
    e.preventDefault();

    if (!accountForm.currentPassword) {
      setErrorMessage("Please enter your current password");
      setShowError(true);
      setShowSuccess(false);
      return;
    }

    const success = updateUserInfo(
      accountForm.username,
      accountForm.currentPassword,
      accountForm.newPassword
    );

    if (success) {
      setShowSuccess(true);
      setShowError(false);
      setAccountForm({
        username: "",
        currentPassword: "",
        newPassword: "",
      });
    } else {
      setErrorMessage("Current password is incorrect");
      setShowError(true);
      setShowSuccess(false);
    }
  };

  // Handle notification form submission
  const handleNotificationSubmit = (e) => {
    e.preventDefault();

    if (notificationForm.message.trim()) {
      addNotification(notificationForm.message);
      setNotificationForm({ message: "" });
      setShowSuccess(true);
      setShowError(false);
    } else {
      setErrorMessage("Please enter notification text");
      setShowError(true);
      setShowSuccess(false);
    }
  };

  // Clear all notifications
  const handleClearNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      clearNotifications();
      setShowSuccess(true);
      setShowError(false);
    }
  };

  return (
    <Container fluid>
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          Changes saved successfully!
        </Alert>
      )}

      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          {errorMessage}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Account Settings</Card.Title>
              <Form onSubmit={handleAccountSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={accountForm.username}
                    onChange={handleAccountFormChange}
                    placeholder={user?.username || "Username"}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={accountForm.currentPassword}
                    onChange={handleAccountFormChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={accountForm.newPassword}
                    onChange={handleAccountFormChange}
                  />
                  <Form.Text className="text-muted">
                    Leave this field empty if you don't want to change your
                    password
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Notification Management</Card.Title>
              <Form onSubmit={handleNotificationSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Send New Notification</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={notificationForm.message}
                    onChange={handleNotificationFormChange}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    Send Notification
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleClearNotifications}
                    disabled={notifications.length === 0}
                  >
                    Clear All Notifications
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Current Notifications</Card.Title>
              {notifications.length > 0 ? (
                <ul className="list-group">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="list-group-item">
                      <small className="text-muted">
                        {notification.timestamp}
                      </small>
                      <div>{notification.message}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center my-3">No notifications currently</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
