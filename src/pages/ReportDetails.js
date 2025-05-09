import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useData } from "../context/DataContext";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    reports,
    editReport,
    updateReportStatus,
    addNotification,
    deleteReport,
  } = useData();
  // No longer need auth check as all users can access these features

  // حالة التقرير
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // حالة التعليقات
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // حالة التحرير
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    location: "",
    type: "",
    details: "",
    priority: "Medium",
  });

  // تحميل Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY", // استبدل بمفتاح API الخاص بك
  });

  // تحميل بيانات التقرير
  useEffect(() => {
    // Clear any previous errors
    setError("");
    setLoading(true);

    if (!id) {
      setError("No report ID provided");
      setLoading(false);
      return;
    }

    try {
      // Make sure to convert the ID to a number since URL parameters are strings
      const reportId = parseInt(id);

      if (isNaN(reportId)) {
        setError(`Invalid report ID: ${id}`);
        setLoading(false);
        return;
      }

      // Find the report with matching ID - ensure we're comparing numbers with numbers
      // Convert all report IDs to numbers for comparison
      const foundReport = reports.find((r) => {
        const rId = parseInt(r.id);
        return rId === reportId;
      });

      if (foundReport) {
        // Set report data
        setReport(foundReport);

        // Load comments from local storage
        try {
          const storedComments =
            JSON.parse(localStorage.getItem(`report_comments_${reportId}`)) ||
            [];
          setComments(storedComments);
        } catch (storageError) {
          console.error("Error loading comments from storage:", storageError);
          setComments([]);
        }

        // Set edit form values
        setEditForm({
          location: foundReport.location,
          type: foundReport.type,
          details: foundReport.details,
          priority: foundReport.priority || "Medium",
        });

        setLoading(false);
      } else {
        setError(
          `Report with ID ${reportId} not found. Please check if the report exists.`
        );
        setLoading(false);
      }
    } catch (error) {
      setError("Error loading report: " + error.message);
      setLoading(false);
    }
  }, [id, reports]);

  // حفظ التعليقات في التخزين المحلي
  useEffect(() => {
    if (report) {
      localStorage.setItem(
        `report_comments_${report.id}`,
        JSON.stringify(comments)
      );
    }
  }, [comments, report]);

  // إضافة تعليق جديد
  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toLocaleString(),
        user: "Admin",
      };

      setComments([...comments, comment]);
      setNewComment("");

      // إضافة إشعار
      addNotification(
        `A new comment has been added to the report.#${report.id}`
      );
    }
  };

  // تحديث حالة التقرير
  const handleUpdateStatus = (status) => {
    if (report) {
      updateReportStatus(report.id, status);
      setReport({ ...report, status });

      // Add automatic comment
      const statusComment = {
        id: Date.now(),
        text: `Report status changed to "${
          status === "Pending" ? "Pending" : "Resolved"
        }"`,
        timestamp: new Date().toLocaleString(),
        user: "System",
        isSystem: true,
      };

      setComments([...comments, statusComment]);
    }
  };

  // معالجة تغيير نموذج التحرير
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // حفظ التعديلات
  const handleSaveEdit = () => {
    if (report) {
      const updatedReport = {
        ...report,
        location: editForm.location,
        type: editForm.type,
        details: editForm.details,
        priority: editForm.priority,
      };

      editReport(report.id, updatedReport);
      setReport(updatedReport);
      setIsEditing(false);

      // Add automatic comment
      const editComment = {
        id: Date.now(),
        text: "Report details have been edited",
        timestamp: new Date().toLocaleString(),
        user: "System",
        isSystem: true,
      };

      setComments([...comments, editComment]);
    }
  };

  // Return to reports page
  const handleBack = () => {
    try {
      navigate("/app/reports");
    } catch (error) {
      console.error("Error navigating back to reports:", error);
      // Fallback to direct location change if navigate fails
      window.location.href = "/app/reports";
    }
  };

  // Delete report
  const handleDeleteReport = () => {
    if (
      report &&
      window.confirm(
        `Are you sure you want to delete the report: ${report.location}?`
      )
    ) {
      deleteReport(report.id);
      addNotification(`Report deleted: ${report.location}`);
      navigate("/app/reports");
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <h4>Error</h4>
          <p>{error}</p>
          <p>
            This could be because the report doesn't exist or there was a
            problem loading it.
          </p>
        </Alert>
        <Button variant="primary" onClick={handleBack}>
          Back to Reports
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {report && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              Report #{report.id} - {report.location}
              <Badge
                bg={report.status === "Pending" ? "warning" : "success"}
                className="ms-2"
              >
                {report.status === "Pending" ? "Pending" : "Resolved"}
              </Badge>
              {report.priority && (
                <Badge
                  bg={
                    report.priority === "High"
                      ? "danger"
                      : report.priority === "Medium"
                      ? "warning"
                      : "info"
                  }
                  className="ms-2"
                >
                  {report.priority === "High"
                    ? "High Priority"
                    : report.priority === "Medium"
                    ? "Medium Priority"
                    : "Low Priority"}
                </Badge>
              )}
            </h2>
            <Button variant="secondary" onClick={handleBack}>
              Back to Reports
            </Button>
          </div>

          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Report Details</Card.Title>

                  {!isEditing ? (
                    <div>
                      <p>
                        <strong>Location:</strong> {report.location}
                      </p>
                      <p>
                        <strong>Type:</strong> {report.type}
                      </p>
                      <p>
                        <strong>Date:</strong> {report.date}
                      </p>
                      <p>
                        <strong>Details:</strong> {report.details}
                      </p>
                      {report.priority && (
                        <p>
                          <strong>Priority:</strong>{" "}
                          {report.priority === "High"
                            ? "High"
                            : report.priority === "Medium"
                            ? "Medium"
                            : "Low"}
                        </p>
                      )}

                      <div className="mt-3">
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Report
                        </Button>
                        {report.status === "Pending" ? (
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => handleUpdateStatus("Resolved")}
                          >
                            Mark as Resolved
                          </Button>
                        ) : (
                          <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => handleUpdateStatus("Pending")}
                          >
                            Reopen
                          </Button>
                        )}
                        <Button variant="danger" onClick={handleDeleteReport}>
                          Delete Report
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={editForm.location}
                          onChange={handleEditFormChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                          name="type"
                          value={editForm.type}
                          onChange={handleEditFormChange}
                        >
                          <option value="Pothole">Pothole</option>
                          <option value="Crack">Crack</option>
                          <option value="Bump">Bump</option>
                          <option value="Flood">Flood</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="details"
                          value={editForm.details}
                          onChange={handleEditFormChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select
                          name="priority"
                          value={editForm.priority}
                          onChange={handleEditFormChange}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </Form.Select>
                      </Form.Group>
                      <div>
                        <Button
                          variant="secondary"
                          className="me-2"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="success" onClick={handleSaveEdit}>
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Comments and Notes</Card.Title>

                  <ListGroup className="mb-3">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <ListGroup.Item
                          key={comment.id}
                          className={comment.isSystem ? "bg-light" : ""}
                        >
                          <div className="d-flex justify-content-between">
                            <strong>{comment.user}</strong>
                            <small className="text-muted">
                              {comment.timestamp}
                            </small>
                          </div>
                          <p className="mb-0">{comment.text}</p>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <p className="text-center my-3">No comments yet</p>
                    )}
                  </ListGroup>

                  <Form onSubmit={handleAddComment}>
                    <Form.Group className="mb-3">
                      <Form.Label>Add New Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Add Comment
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Location on Map</Card.Title>
                  <div style={{ height: "300px" }}>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{ lat: 30.0444, lng: 31.2357 }} // Replace with actual location coordinates
                        zoom={15}
                      >
                        <Marker position={{ lat: 30.0444, lng: 31.2357 }} />
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
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Actions</Card.Title>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary">
                      <i className="bi bi-printer me-2"></i>
                      Print Report
                    </Button>
                    <Button variant="outline-success">
                      <i className="bi bi-file-earmark-excel me-2"></i>
                      Export to Excel
                    </Button>
                    <Button variant="outline-info">
                      <i className="bi bi-share me-2"></i>
                      Share Report
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ReportDetails;
