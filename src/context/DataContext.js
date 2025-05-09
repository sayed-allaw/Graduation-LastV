import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const DataContext = createContext();

// Context provider
export const DataProvider = ({ children }) => {
  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalIssues: 150,
    activeUsers: 75,
    roadsMonitored: 20,
  });

  // Reports
  const [reports, setReports] = useState([
    {
      id: 1,
      location: "Tahrir Street",
      type: "Pothole",
      date: "2025-03-10",
      status: "Pending",
      details: "Large pothole near the square",
      priority: "High",
      assignedTo: "Ahmed",
    },
    {
      id: 2,
      location: "Nasr Road",
      type: "Crack",
      date: "2025-03-11",
      status: "Resolved",
      details: "Crack fixed by team",
      priority: "Medium",
      assignedTo: "Sara",
    },
    {
      id: 3,
      location: "October Bridge",
      type: "Bump",
      date: "2025-03-12",
      status: "Pending",
      details: "Dangerous bump causing accidents",
      priority: "High",
      assignedTo: null,
    },
    {
      id: 4,
      location: "Giza Street",
      type: "Flood",
      date: "2025-03-13",
      status: "Pending",
      details: "Street flooded after rain",
      priority: "Medium",
      assignedTo: null,
    },
  ]);

  // المستخدمين
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Elsayed Allaw ",
      email: "sayedallaw@gmail.com",
      status: "Active",
      joined: "2025-04-07",
    },
    {
      id: 2,
      name: "Test ",
      email: "test@example.com",
      status: "Inactive",
      joined: "2025-05-05",
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Chart data
  const [chartData, setChartData] = useState({
    issueTypes: [50, 30, 20, 10],
    statusDistribution: [70, 30],
  });

  // Load data from local storage on startup
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports"));
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications")
    );

    if (storedReports) setReports(storedReports);
    if (storedUsers) setUsers(storedUsers);
    if (storedNotifications) setNotifications(storedNotifications);

    // Simulate real-time data updates
    const interval = setInterval(() => {
      updateDashboardData();
      updateChartData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Save data to local storage when changed
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Update dashboard data
  const updateDashboardData = () => {
    setDashboardData((prev) => ({
      totalIssues: prev.totalIssues + Math.floor(Math.random() * 3),
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 2),
      roadsMonitored: prev.roadsMonitored + (Math.random() > 0.8 ? 1 : 0),
    }));
  };

  // Update chart data
  const updateChartData = () => {
    setChartData((prev) => ({
      issueTypes: prev.issueTypes.map(
        (val) => val + Math.floor(Math.random() * 3)
      ),
      statusDistribution: [
        prev.statusDistribution[0] + Math.floor(Math.random() * 2),
        prev.statusDistribution[1] + Math.floor(Math.random() * 2),
      ],
    }));
  };

  // Add new report
  const addReport = (reportData) => {
    const newId =
      reports.length > 0 ? Math.max(...reports.map((r) => r.id)) + 1 : 1;
    const newReport = {
      id: newId,
      ...reportData,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setReports([...reports, newReport]);

    // Add notification
    addNotification(`New report added: ${reportData.location}`);

    return newReport;
  };

  // Update report status
  const updateReportStatus = (id, status) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, status } : report
    );

    setReports(updatedReports);

    // Add notification
    const report = reports.find((r) => r.id === id);
    if (report) {
      addNotification(`Report status updated${report.location} to${status}`);
    }

    return updatedReports;
  };

  // Edit report
  const editReport = (id, updatedData) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, ...updatedData } : report
    );

    setReports(updatedReports);

    // Add notification
    addNotification(`Report edited: ${updatedData.location || "a report"}`);

    return updatedReports;
  };

  // Add new user
  const addUser = (userData) => {
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      ...userData,
      joined: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);

    // Add notification
    addNotification(`New user added: ${userData.name}`);

    return newUser;
  };

  // Update user status
  const updateUserStatus = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status } : user
    );

    setUsers(updatedUsers);

    // Add notification
    const user = users.find((u) => u.id === id);
    if (user) {
      addNotification(`User status updated ${user.name} To ${status}`);
    }

    return updatedUsers;
  };

  // Delete user
  const deleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);

    // Add notification
    if (user) {
      addNotification(`User deleted: ${user.name}`);
    }

    return updatedUsers;
  };

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    return newNotification;
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    return [];
  };

  // Set report priority
  const setReportPriority = (id, priority) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, priority } : report
    );

    setReports(updatedReports);

    // Add notification
    const report = reports.find((r) => r.id === id);
    if (report) {
      addNotification(
        `Report priority updated ${report.location} To ${priority}`
      );
    }

    return updatedReports;
  };

  // Assign report
  const assignReport = (id, assignedTo) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, assignedTo } : report
    );

    setReports(updatedReports);

    // Add notification
    const report = reports.find((r) => r.id === id);
    if (report) {
      addNotification(
        `The report has been assigned. ${report.location} To ${
          assignedTo || "Not specified"
        }`
      );
    }

    return updatedReports;
  };

  // Delete report
  const deleteReport = (id) => {
    const report = reports.find((r) => r.id === id);
    const updatedReports = reports.filter((report) => report.id !== id);

    setReports(updatedReports);

    // Add notification
    if (report) {
      addNotification(`Report deleted: ${report.location}`);
    }

    return updatedReports;
  };

  // Update status of multiple reports
  const bulkUpdateReportStatus = (ids, status) => {
    const updatedReports = reports.map((report) =>
      ids.includes(report.id) ? { ...report, status } : report
    );

    setReports(updatedReports);

    // Add notification
    addNotification(`Status updated${ids.length} Reports to${status}`);

    return updatedReports;
  };

  // Values to be provided to components
  const value = {
    dashboardData,
    reports,
    users,
    notifications,
    chartData,
    addReport,
    updateReportStatus,
    editReport,
    addUser,
    updateUserStatus,
    deleteUser,
    addNotification,
    clearNotifications,
    updateDashboardData,
    updateChartData,
    // Admin functions
    setReportPriority,
    assignReport,
    deleteReport,
    bulkUpdateReportStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
