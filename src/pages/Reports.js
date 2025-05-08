import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

const Reports = () => {
  const navigate = useNavigate();
  const {
    reports,
    addReport,
    updateReportStatus,
    editReport,
    deleteReport,
    bulkUpdateReportStatus,
  } = useData();
  const { isAdmin } = useAuth();

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Form state
  const [formData, setFormData] = useState({
    location: "",
    type: "Pothole",
    details: "",
    priority: "Medium",
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Selected reports state for bulk actions
  const [selectedReports, setSelectedReports] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addReport(formData);
    setFormData({
      location: "",
      type: "Pothole",
      details: "",
      priority: "Medium",
    });
  };

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  // View report
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setEditMode(false);
    setShowModal(true);
  };

  // Edit report
  const handleEditReport = () => {
    setEditMode(true);
  };

  // Save edits
  const handleSaveEdit = () => {
    editReport(selectedReport.id, selectedReport);
    setEditMode(false);
  };

  // Update report status
  const handleResolveReport = (id) => {
    updateReportStatus(id, "Resolved");
  };

  // Export reports to CSV
  const exportToCSV = () => {
    let csv = "ID,Location,Type,Date,Status,Priority,Details\n";
    reports.forEach((report) => {
      csv += `${report.id},${report.location},${report.type},${report.date},${
        report.status
      },${report.priority || "Medium"},${report.details}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Navigate to report details page
  const navigateToReportDetails = (id) => {
    navigate(`/reports/${id}`);
  };

  // Handle report selection/deselection
  const handleReportSelection = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((reportId) => reportId !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }

    // Show/hide bulk actions bar
    if (selectedReports.length > 0 || !selectedReports.includes(id)) {
      setShowBulkActions(true);
    } else {
      setShowBulkActions(false);
    }
  };

  // Select/deselect all reports
  const handleSelectAllReports = (e) => {
    if (e.target.checked) {
      setSelectedReports(currentItems.map((report) => report.id));
      setShowBulkActions(true);
    } else {
      setSelectedReports([]);
      setShowBulkActions(false);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedReports.length === 0) return;

    switch (action) {
      case "resolve":
        bulkUpdateReportStatus(selectedReports, "Resolved");
        break;
      case "pending":
        bulkUpdateReportStatus(selectedReports, "Pending");
        break;
      case "delete":
        if (
          window.confirm(
            `Are you sure you want to delete ${selectedReports.length} reports?`
          )
        ) {
          selectedReports.forEach((id) => deleteReport(id));
          setSelectedReports([]);
          setShowBulkActions(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Add New Report</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                      >
                        <option value="Pothole">Pothole</option>
                        <option value="Crack">Crack</option>
                        <option value="Bump">Bump</option>
                        <option value="Flood">Flood</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Priority</Form.Label>
                      <Form.Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleFormChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="details"
                        value={formData.details}
                        onChange={handleFormChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Add Report
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title>Reports List</Card.Title>
                <div>
                  {isAdmin && (
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => navigate("/reports/new")}
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      Add New Report
                    </Button>
                  )}
                  <Button variant="success" onClick={exportToCSV}>
                    <i className="bi bi-file-earmark-excel me-2"></i>
                    Export to Excel
                  </Button>
                </div>
              </div>

              {/* Bulk actions bar */}
              {isAdmin && showBulkActions && (
                <div className="bg-light p-2 mb-3 rounded d-flex justify-content-between align-items-center">
                  <div>
                    <span className="me-2">
                      {selectedReports.length} reports selected
                    </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setSelectedReports([])}
                    >
                      Deselect All
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleBulkAction("resolve")}
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Mark as Resolved
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleBulkAction("pending")}
                    >
                      <i className="bi bi-arrow-repeat me-1"></i>
                      Reopen
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleBulkAction("delete")}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              <Row className="mb-3">
                <Col md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </Form.Select>
                </Col>
              </Row>

              <Table responsive hover>
                <thead className="table-dark">
                  <tr>
                    {isAdmin && (
                      <th>
                        <Form.Check
                          type="checkbox"
                          onChange={handleSelectAllReports}
                          checked={
                            selectedReports.length === currentItems.length &&
                            currentItems.length > 0
                          }
                        />
                      </th>
                    )}
                    <th>#</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    {isAdmin && <th>Priority</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((report) => (
                      <tr key={report.id}>
                        {isAdmin && (
                          <td>
                            <Form.Check
                              type="checkbox"
                              onChange={() => handleReportSelection(report.id)}
                              checked={selectedReports.includes(report.id)}
                            />
                          </td>
                        )}
                        <td>{report.id}</td>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateToReportDetails(report.id);
                            }}
                            className="text-primary"
                          >
                            {report.location}
                          </a>
                        </td>
                        <td>{report.type}</td>
                        <td>{report.date}</td>
                        <td>
                          <Badge
                            bg={
                              report.status === "Pending"
                                ? "warning"
                                : "success"
                            }
                          >
                            {report.status === "Pending"
                              ? "Pending"
                              : "Resolved"}
                          </Badge>
                        </td>
                        {isAdmin && (
                          <td>
                            <Badge
                              bg={
                                report.priority === "High"
                                  ? "danger"
                                  : report.priority === "Medium"
                                  ? "warning"
                                  : "info"
                              }
                            >
                              {report.priority === "High"
                                ? "High"
                                : report.priority === "Medium"
                                ? "Medium"
                                : "Low"}
                            </Badge>
                          </td>
                        )}
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            className="me-2"
                            onClick={() => navigateToReportDetails(report.id)}
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2"
                                disabled={report.status === "Resolved"}
                                onClick={() => handleResolveReport(report.id)}
                              >
                                <i className="bi bi-check-lg"></i>
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete the report: ${report.location}?`
                                    )
                                  ) {
                                    deleteReport(report.id);
                                  }
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={isAdmin ? "8" : "6"}
                        className="text-center py-3"
                      >
                        No reports match your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for viewing and editing report */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Report #{selectedReport?.id} - {selectedReport?.location}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && !editMode ? (
            <div>
              <p>
                <strong>Location:</strong> {selectedReport.location}
              </p>
              <p>
                <strong>Type:</strong> {selectedReport.type}
              </p>
              <p>
                <strong>Date:</strong> {selectedReport.date}
              </p>
              <p>
                <strong>Condition:</strong>{" "}
                {selectedReport.status === "Pending" ? "Pending " : " Resolved"}
              </p>
              {selectedReport.priority && (
                <p>
                  <strong>priority:</strong>{" "}
                  {selectedReport.priority === "High"
                    ? " High"
                    : selectedReport.priority === "Medium"
                    ? " Medium"
                    : " Low"}
                </p>
              )}
              <p>
                <strong>Details:</strong> {selectedReport.details}
              </p>
            </div>
          ) : selectedReport && editMode ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedReport.location}
                  onChange={(e) =>
                    setSelectedReport({
                      ...selectedReport,
                      location: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={selectedReport.type}
                  onChange={(e) =>
                    setSelectedReport({
                      ...selectedReport,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="Pothole">Pothole</option>
                  <option value="Crack">Crack</option>
                  <option value="Bump">Bump</option>
                  <option value="Flood">Flood</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={selectedReport.priority || "Medium"}
                  onChange={(e) =>
                    setSelectedReport({
                      ...selectedReport,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedReport.details}
                  onChange={(e) =>
                    setSelectedReport({
                      ...selectedReport,
                      details: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          {!editMode ? (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditReport}>
                Edit Report
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reports;
