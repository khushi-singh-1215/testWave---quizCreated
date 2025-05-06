import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionBankPage = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const teacherEmail = sessionStorage.getItem('teacherEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!teacherEmail) return;

    const fetchQuestionBanks = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/api/question-banks/questionsteacher/${teacherEmail}`);
        setQuestionBanks(response.data);
      } catch (error) {
        console.error("Error fetching question banks:", error);
      }
    };

    fetchQuestionBanks();
  }, [teacherEmail]);

  const handleCreateQuestionBank = () => {
    navigate('/create-question-bank');
  };

  const handleViewQuestions = (id) => {
    navigate(`/view-question-bank/${id}`);
  };

  const handleDeleteQuestionBank = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question bank?')) return;

    try {
      await axios.delete(`http://localhost:9091/api/question-banks/${id}`);
      setQuestionBanks(prev => prev.filter(qb => qb.id !== id));
    } catch (error) {
      console.error("Error deleting question bank:", error);
      alert('Failed to delete question bank.');
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Question Banks</h2>

      <button className="btn btn-primary mb-3" onClick={handleCreateQuestionBank}>
        Create New Question Bank
      </button>

      {questionBanks.length === 0 ? (
        <p>No question banks found. Create one to get started.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Total Questions</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questionBanks.map((qb) => (
              <tr key={qb.id}>
                <td>{qb.name}</td>
                <td>{qb.questions ? qb.questions.length : 0}</td>
                <td>{new Date(qb.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => handleViewQuestions(qb.id)}>
                    View Questions
                  </button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/edit-question-bank/${qb.id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteQuestionBank(qb.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuestionBankPage;
