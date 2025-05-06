import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ActiveQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quizCode, setQuizCode] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchActiveQuizzes();
    const interval = setInterval(fetchActiveQuizzes, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchActiveQuizzes = () => {
    fetch("http://localhost:9091/api/quizzes/allquizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  };

  const handleJoinClick = (quizId) => {
    setSelectedQuizId(quizId);
    setShowModal(true);
    setQuizCode("");
    setError("");
  };

  const handleJoinWithCode = () => {
    if (!quizCode) {
      setError("Please enter a valid quiz code.");
      return;
    }

    fetch(
      `http://localhost:9091/api/quizzes/join/${selectedQuizId}?code=${quizCode}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data.success) {
          //window.location.href = `/quiz-page/${selectedQuizId}`;
          navigate("/quiz-instructions", { state: { quizCode, quizName: data.quizName } });
        } else {
          setError("Invalid quiz code. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error joining the quiz:", error);
        setError("Error joining the quiz.");
      });
  };

  const handlePracticeQuiz = () => {
    window.location.href = "/practice-quiz-inst";
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Active Quizzes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Total Time</th>
            <th>Total Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.quizName}</td>
                <td>{quiz.totalQuestions * 15} seconds</td>
                <td>{quiz.totalQuestions}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleJoinClick(quiz.id)}
                  >
                    Join
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No active quizzes
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Join Quiz Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={handlePracticeQuiz}
          >
            Take Practice Quiz
          </Button>
          <Form.Group>
            <Form.Label>Enter Quiz Code</Form.Label>
            <Form.Control
              type="text"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              placeholder="Enter code..."
            />
          </Form.Group>
          {error && <p className="text-danger mt-2">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleJoinWithCode}>
            Join with Code
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ActiveQuizzes;
