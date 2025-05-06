import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PracticeInstructionsPage = () => {
  const navigate = useNavigate();

  const startPracticeQuiz = () => {
    navigate("/practice-quiz"); // Redirect to Practice Quiz Page
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Practice Quiz Instructions</h2>
        <p className="mt-3">
          This is a <b>Practice Quiz</b>. 
        </p>
        <ul>
          <li>Each question is <b>section-based</b>.</li>
          <li>You <b>cannot move back</b> to previous questions.</li>
          <li>Each question has a <b>15-second time limit</b>.</li>
          <li>When the timer runs out, the next question will appear automatically.</li>
          <li>At the last question, click <b>Submit</b> to view your score.</li>
        </ul>
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={startPracticeQuiz}>
            Start Practice Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeInstructionsPage;
