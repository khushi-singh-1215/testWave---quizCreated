import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const StudentDashboard = () => {
  const [quizData, setQuizData] = useState({
    quizzes: [],
    correct: 0,
    incorrect: 0,
  });

  useEffect(() => {
    const studentEmail = sessionStorage.getItem("studentEmail"); // Dynamically fetch student email
    axios
      .get(`http://localhost:9091/api/quizzes/results/student/${studentEmail}`)
      .then((response) => {
        const quizzes = response.data; // Get the list of quizzes

        // Only take the last 5 quizzes
        const lastFiveQuizzes = quizzes.slice(0, 5);

        let correct = 0;
        let incorrect = 0;
        let totalMarks = 0;

        // Process each quiz result
        lastFiveQuizzes.forEach((quiz) => {
          console.log("Quiz Data:", quiz);

          const score = quiz.score;
          const total = quiz.total;

          correct += score;
          totalMarks += total;
          incorrect += total - score;
        });

        setQuizData({ correct, incorrect, totalMarks });
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const totalQuestions = quizData.correct + quizData.incorrect;
  const correctPercentage =
    totalQuestions > 0 ? ((quizData.correct / totalQuestions) * 100).toFixed(2) : 0;
  const incorrectPercentage =
    totalQuestions > 0 ? ((quizData.incorrect / totalQuestions) * 100).toFixed(2) : 0;

  const data = [
    { name: "Correct", value: quizData.correct, color: "#28a745" },
    { name: "Incorrect", value: quizData.incorrect, color: "#dc3545" },
  ];

  const handleLogout = () => {
    sessionStorage.clear();  
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column align-items-center"
        style={{ width: "250px" }}
      >
        <h2 className="text-center">TESTWAVE</h2>
        <p className="mt-3">👤 Student</p>
        <nav className="w-100">
          <Link className="d-block text-white p-2 text-decoration-none" to="/student-profile">
            👩‍🏫 Profile
          </Link>
          <Link className="d-block text-white p-2 text-decoration-none" to="/active-quizzes">
            ❓ Active Quiz
          </Link>
          <Link className="d-block text-white p-2 text-decoration-none" to="/scores">
            🎓 Results
          </Link>
        </nav>
        <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="col-md-9 p-4 d-flex flex-column align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body text-center">
                <h5>Correct Answers</h5>
                <h3>{correctPercentage}%</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body text-center">
                <h5>Incorrect Answers</h5>
                <h3>{incorrectPercentage}%</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <h3>Score Analysis</h3>
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
