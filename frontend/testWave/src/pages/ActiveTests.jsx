import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const ActiveTests = () => {
  const [tests, setTests] = useState([]);

  // Fetch active tests
  useEffect(() => {
    fetch("http://localhost:8080/api/quizzes/active")
      .then((res) => res.json())
      .then((data) => setTests(data))
      .catch((err) => console.error("Error fetching active quizzes:", err));
  }, []);

  // Deactivate a quiz
  const handleDeactivate = (quizId) => {
    fetch(`http://localhost:8080/api/quizzes/deactivate/${quizId}`, {
      method: "PUT",
    })
      .then(() => {
        setTests((prevTests) => prevTests.filter((quiz) => quiz.id !== quizId));
      })
      .catch((err) => console.error("Error deactivating quiz:", err));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Active Quiz</h2>
      {tests.length === 0 ? (
        <p className="text-center">No active Quizzes available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Quiz Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.subject}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeactivate(quiz.id)}
                  >
                    Deactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ActiveTests;