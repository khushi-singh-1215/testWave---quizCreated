import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizInstructionsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quizCode = state?.quizCode;
  const quizName = state?.quizName || "Quiz";

  const startQuiz = () => {
    navigate("/quiz", { state: { quizCode } });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">{quizName} Instructions</h2>
        <ul>
          <li>This is a <b>section-based</b> quiz.</li>
          <li>Each section has a <b>time limit</b>.</li>
          <li>Once you complete section, you <b>cannot go back</b>.</li>
          <li>Click <b>Start Quiz</b> to begin.</li>
        </ul>
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructionsPage;
