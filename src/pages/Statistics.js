import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useData } from "../context/DataContext";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Statistics = () => {
  const { chartData, updateChartData } = useData();

  // Update data every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateChartData();
    }, 8000);

    return () => clearInterval(interval);
  }, [updateChartData]);

  // Bar chart data
  const barChartData = {
    labels: ["Pothole", "Crack", "Bump", "Flood"],
    datasets: [
      {
        label: "Number of Issues",
        data: chartData.issueTypes,
        backgroundColor: ["#07389C", "#B3D5F7", "#EBF5FF", "#3498db"],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Issues Distribution by Type",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie chart data
  const pieChartData = {
    labels: ["Pending", "Resolved"],
    datasets: [
      {
        data: chartData.statusDistribution,
        backgroundColor: ["#B3D5F7", "#07389C"],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Issues Distribution by Status",
      },
    },
  };

  // Update data manually
  const handleUpdateCharts = () => {
    updateChartData();
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>Issues by Type</Card.Title>
              <div style={{ height: "400px" }}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
              <div className="text-center mt-3">
                <Button variant="primary" onClick={handleUpdateCharts}>
                  Update Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Status Distribution</Card.Title>
              <div style={{ height: "400px" }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
              <div className="text-center mt-3">
                <Button variant="primary" onClick={handleUpdateCharts}>
                  Update Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>General Statistics</Card.Title>
              <Row className="text-center">
                <Col md={3}>
                  <div className="stat-item">
                    <h3>{chartData.issueTypes.reduce((a, b) => a + b, 0)}</h3>
                    <p>Total Issues</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <h3>{chartData.statusDistribution[0]}</h3>
                    <p>Pending Issues</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <h3>{chartData.statusDistribution[1]}</h3>
                    <p>Resolved Issues</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <h3>
                      {Math.round(
                        (chartData.statusDistribution[1] /
                          (chartData.statusDistribution[0] +
                            chartData.statusDistribution[1])) *
                          100
                      )}
                      %
                    </h3>
                    <p>Completion Rate</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
