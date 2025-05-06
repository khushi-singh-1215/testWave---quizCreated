import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentResult = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const studentEmail = sessionStorage.getItem("studentEmail");

    if (!studentEmail) {
      // If no email in sessionStorage, redirect to login page
      alert("You are not logged in. Please log in first.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:9091/api/quizzes/results/student/${studentEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizResults(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching quiz results.");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Loading quiz results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Your Previous Quiz Attempts</h2>
      {quizResults.length === 0 ? (
        <p>No previous quiz attempts found.</p>
      ) : (
        <div className="list-group">
          {quizResults.map((result, index) => (
            <div key={index} className="list-group-item">
              <h5>Quiz Code: {result.quizCode}</h5>
              <p>Score: {result.score} out of {result.total}</p>
              <p>Date: {new Date(result.submissionDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentResult;
