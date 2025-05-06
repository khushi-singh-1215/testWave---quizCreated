import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

const PreviousQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:9091/api/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:9091/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id)); // Remove deleted quiz from state
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Quizzes</h2>
      <Row>
        {quizzes.map((quiz) => (
          <Col md={4} key={quiz.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{quiz.quizName}</Card.Title>
                <Card.Text>
                  <strong>Total Questions:</strong> {quiz.totalQuestions}
                  <br />
                  <strong>Time:</strong> {quiz.quizTime} minutes
                  <br />
                  <strong>Total Marks:</strong> {quiz.totalMarks}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteQuiz(quiz.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PreviousQuizzes;