import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const Found = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:7000/fetchReports");
      if (response.ok) {
        const reportsData = await response.json();
        setReports(reportsData);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFoundButtonClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/deleteReport/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the report from the state
        setReports((prevReports) =>
          prevReports.filter((report) => report._id !== id)
        );
        console.log("Report deleted successfully");
      } else {
        console.error("Failed to delete report");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {reports.map((report) => (
        <Col key={report._id}>
          <Card>
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${report.image}`}
              alt={`${report.firstName} ${report.lastName}'s Image`}
              onError={(e) => {
                e.target.src = ""; // Show a default image if the base64 data is invalid
              }}
            />
            <Card.Body>
              <Card.Title>{`${report.firstName} ${report.lastName}`}</Card.Title>
              <Card.Text>
                Age: {report.age} | Last Known Location:{" "}
                {report.lastKnownLocation}
              </Card.Text>
              <Card.Text>Description: {report.description}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleFoundButtonClick(report._id)}
              >
                Mark as Found
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Found;
