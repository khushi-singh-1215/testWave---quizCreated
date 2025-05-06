import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowParticularQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <div>Loading quiz data...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{quiz.quizName}</h2>
      <p>Time: {quiz.quizTime} mins | Total Questions: {quiz.totalQuestions} | Total Marks: {quiz.totalMarks}</p>
      <h3>Questions</h3>
      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => (
          <div className="card mb-3" key={question.id}>
            <div className="card-body">
              <h5 className="card-title">Q{index + 1}. {question.text}</h5>
              <ul className="list-group">
                {question.options && question.options.length > 0 ? (
                  question.options.map((option, idx) => (
                    <li
                      key={idx}
                      className={`list-group-item ${question.correctAnswers.includes(idx) ? 'bg-success text-white font-weight-bold' : ''}`}
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No options available.</li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
};

export default ShowParticularQuiz;
