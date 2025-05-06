import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditQuestionBankPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:9091/api/questions/bank/${id}`);
      setQuestions(res.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:9091/api/questions/${questionId}`);
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };

  const handleAddQuestion = () => {
    setNewQuestions([...newQuestions, { text: '', type: 'MCQ', marks: 1, options: ['', '', '', ''], correctAnswers: [] }]);
  };

  const handleChangeNewQuestion = (index, field, value) => {
    const updated = [...newQuestions];
    updated[index][field] = field === 'marks' ? Number(value) : value; // ensure marks is a number
    setNewQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...newQuestions];
    updated[qIndex].options[oIndex] = value;
    setNewQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...newQuestions];
    const selectedOptionIndex = parseInt(value, 10);
    if (updated[qIndex].correctAnswers.includes(selectedOptionIndex)) {
      updated[qIndex].correctAnswers = updated[qIndex].correctAnswers.filter(i => i !== selectedOptionIndex);
    } else {
      updated[qIndex].correctAnswers.push(selectedOptionIndex);
    }
    setNewQuestions(updated);
  };

  const handleSaveNewQuestions = async () => {
    const formatted = newQuestions.map(q => ({
      text: q.text,
      type: q.type,
      marks: q.marks,
      options: q.options,
      correctAnswers: q.correctAnswers, // array of indexes
    }));

    try {
      await axios.post(`http://localhost:9091/api/questions/${id}`, formatted);
      fetchQuestions();
      setNewQuestions([]);
    } catch (error) {
      console.error("Failed to save new questions", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Question Bank</h3>

      <h5 className="mt-4">Existing Questions</h5>
      <ul className="list-group mb-4">
        {questions.map(q => (
          <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
            {q.text}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h5>Add New Questions</h5>
      <button className="btn btn-secondary mb-3" onClick={handleAddQuestion}>+ Add Question</button>

      {newQuestions.map((q, idx) => (
        <div key={idx} className="card p-3 mb-3">
          <input className="form-control mb-2" placeholder="Question Text" value={q.text}
                 onChange={e => handleChangeNewQuestion(idx, 'text', e.target.value)} />

          <div className="row">
            {q.options.map((opt, optIdx) => (
              <div key={optIdx} className="col-md-6 mb-2">
                <input
                  className="form-control"
                  placeholder={`Option ${optIdx + 1}`}
                  value={opt}
                  onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                />
              </div>
            ))}
          </div>

          <input className="form-control mb-2" type="number" placeholder="Marks"
                 value={q.marks} onChange={e => handleChangeNewQuestion(idx, 'marks', e.target.value)} />

          <select className="form-select mb-2"
                  onChange={e => handleCorrectAnswerChange(idx, e.target.value)}>
            <option value="">Select Correct Option(s)</option>
            {q.options.map((opt, optIdx) => (
              <option key={optIdx} value={optIdx}>
                Option {optIdx + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      {newQuestions.length > 0 && (
        <button className="btn btn-primary" onClick={handleSaveNewQuestions}>Save Questions</button>
      )}
    </div>
  );
};

export default EditQuestionBankPage;
