import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [answers, setAnswers] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);

  const navigate = useNavigate(); // To handle the navigation
  const { state } = useLocation();
  const quizCode = state?.quizCode;

  useEffect(() => {
    const email = sessionStorage.getItem("studentEmail");
    if (email) {
      setStudentEmail(email);
    } else {
      // Handle case where email is not found in sessionStorage
      alert("No student email found. Please log in again.");
      navigate("/login"); // Redirect to login page if no email is found
    }

    fetch(`http://localhost:9091/api/quizzes/questions/${quizCode}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [quizCode]);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const nextQuestion = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestion]?.id, selectedAnswerIndex: getSelectedIndex() },
    ]);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(15);
    } else {
      submitQuiz();
    }
  };

  const getSelectedIndex = () => {
    return questions[currentQuestion]?.options.findIndex((opt) => opt === selectedAnswer);
  };

  const submitQuiz = () => {
    const payload = {
      studentEmail,
      quizCode,
      answers: answers.map((a) => ({
        questionId: a.questionId,
        selectedAnswerIndex: a.selectedAnswerIndex,
      })),
    };

    fetch("http://localhost:9091/api/quizzes/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.text()) // Assuming backend returns a string result
      .then((resultMessage) => {
        // Extract score and total from result message (e.g., "You scored 10 out of 20")
        const score = resultMessage.match(/\d+/g)[0];
        const total = resultMessage.match(/\d+/g)[1];

        // Set state for score and total
        setScore(score);
        setTotal(total);

        // Show the modal after quiz submission
        setShowModal(true);
      })
      .catch((error) => console.error("Error submitting quiz:", error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate("/studentdashboard");
    }, 500); // Small delay to ensure modal closes before navigating
  };
  

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-75">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-danger fw-bold fs-4">⏱ Time Left: {timer}s</span>
          <h5>
            Question {currentQuestion + 1} of {questions.length}
          </h5>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-4">{questions[currentQuestion]?.questionText}</h5>
            <div className="mb-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div key={index} className="form-check mb-3 d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="answer"
                    id={`option${index}`}
                    value={option}
                    onChange={() => setSelectedAnswer(option)}
                    checked={selectedAnswer === option}
                    style={{
                      transform: "scale(1.6)",
                      marginRight: "10px",
                      border: "2px solid black",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option${index}`}
                    style={{ fontSize: "1rem", cursor: "pointer" }}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end">
              {currentQuestion === questions.length - 1 ? (
                <button className="btn btn-success" onClick={submitQuiz}>Submit</button>
              ) : (
                <button className="btn btn-primary" onClick={nextQuestion}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show the quiz result */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Submission Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>You scored {score} out of {total}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuizPage;
