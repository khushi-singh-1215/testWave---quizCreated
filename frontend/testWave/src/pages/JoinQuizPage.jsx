import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const JoinQuizPage = () => {
  const [quizCode, setQuizCode] = useState("");
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    fetch(`http://localhost:8080/api/quiz/questions/${quizCode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          navigate("/quiz-instructions", { state: { quizCode } });
        } else {
          alert("Invalid Quiz Code! Try again.");
        }
      })
      .catch((error) => console.error("Error joining quiz:", error));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Join Quiz</h2>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Enter Quiz Code"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleJoinQuiz}>
          Join Quiz
        </button>
      </div>
    </div>
  );
};

export default JoinQuizPage;