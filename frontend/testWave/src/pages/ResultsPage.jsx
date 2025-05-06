import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:9091/api/results");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">All Quiz Results</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {results.map((result, index) => (
          <Col key={index}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">
                  {result.quizTitle}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Quiz Code: {result.quizCode}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Student:</strong> {result.studentEmail}<br />
                  <strong>Score:</strong> {result.score} / {result.total}<br />
                  <strong>Submitted:</strong> {new Date(result.submissionDate).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResultsPage;
