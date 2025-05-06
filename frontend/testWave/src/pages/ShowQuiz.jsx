import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation

const ShowQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve teacher's email from sessionStorage
  const teacherEmail = sessionStorage.getItem('teacherEmail');
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // If email doesn't exist in sessionStorage, redirect to login
    if (!teacherEmail) {
      navigate('/login'); // Redirect to login or another page if email is not in sessionStorage
      return;
    }

    // Fetch quizzes created by the teacher using their email
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/api/quizzes/teacher/email/${teacherEmail}`);
        console.log('Fetched quizzes:', response.data); // Log the fetched quizzes to debug
        setQuizzes(response.data);
      } catch (err) {
        setError('Error fetching quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [teacherEmail, navigate]); // Re-fetch if email changes (unlikely, but good practice)

  // Handle deleting a quiz
  const handleDelete = async (quizCode) => {
    try {
      await axios.delete(`http://localhost:9091/api/quizzes/${quizCode}`);
      setQuizzes(quizzes.filter(quiz => quiz.quizCode !== quizCode)); // Update the UI after deletion
    } catch (err) {
      setError('Error deleting quiz');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Quizzes Created by {teacherEmail}</h2>
      <div className="row">
        {quizzes.map((quiz) => (
          <div key={quiz.quizCode} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{quiz.quizName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Total Questions: {quiz.totalQuestions}
                </Card.Subtitle>
                <Card.Text>
                  Equal Weightage: {quiz.equalWeightage ? 'Yes' : 'No'}
                </Card.Text>
                {/* Display quizCode */}
                <Card.Text>
                  <strong>Quiz Code: </strong>{quiz.quizCode}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/quiz-details/${quiz.quizCode}`)}>
                  View Details
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(quiz.quizCode)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowQuiz;
