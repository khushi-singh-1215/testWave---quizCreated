import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewQuestionBank = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/api/questions/bank/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  if (loading) return <div className="container mt-4">Loading questions...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>View Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found in this bank.</p>
      ) : (
        <div className="accordion" id="questionAccordion">
          {questions.map((question, index) => (
            <div className="card mb-3" key={question.id}>
              <div className="card-header">
                <h5 className="mb-0">
                  {index + 1}. {question.text} <span className="badge bg-secondary ms-2">{question.type}</span>{' '}
                  <span className="badge bg-info ms-2">{question.marks} Marks</span>
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {question.options?.map((opt, i) => {
                    const isCorrect = question.correctAnswers?.some(ans => ans.answerIndex === i);
                    return (
                      <li
                        key={opt.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          isCorrect ? 'list-group-item-success' : ''
                        }`}
                      >
                        {i + 1}. {opt.optionText}
                        {isCorrect && <span className="badge bg-success">Correct</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewQuestionBank;
