import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionBankName, setQuestionBankName] = useState('');
  const teacherEmail = sessionStorage.getItem('teacherEmail'); // Get teacher's email from session storage
  const navigate = useNavigate(); // To redirect to another page

  // Add a new question
  const addQuestion = () => {
    if (questions.length < 100) {
      setQuestions([
        ...questions,
        { 
          id: Date.now(), 
          type: "MCQ", 
          text: "", 
          options: ["", "", "", ""], 
          correctAnswers: [] 
        }
      ]);
    }
  };

  // Update question text or type
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Update an option text
  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  // Toggle correct answer selection (for MCQ)
  const toggleCorrectAnswer = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    const correctAnswers = newQuestions[qIndex].correctAnswers;

    if (correctAnswers.includes(oIndex)) {
      newQuestions[qIndex].correctAnswers = correctAnswers.filter(ans => ans !== oIndex);
    } else {
      newQuestions[qIndex].correctAnswers = [...correctAnswers, oIndex];
    }

    setQuestions(newQuestions);
  };

  // Set correct answer for True/False (Only one answer allowed)
  const setTrueFalseAnswer = (qIndex, answer) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswers = [answer === "True" ? 0 : 1]; // 0 for True, 1 for False
    setQuestions(newQuestions);
  };

  // Submit questions to backend
  const submitQuestions = async () => {
    if (!questionBankName.trim()) {
      alert("Please enter a name for the question bank.");
      return;
    }

    for (let q of questions) {
      if (!q.text.trim()) {
        alert("Please enter text for all questions.");
        return;
      }
      if (q.type === "MCQ" && q.correctAnswers.length === 0) {
        alert("Each MCQ must have at least one correct answer.");
        return;
      }
      if (q.type === "TrueFalse" && q.correctAnswers.length !== 1) {
        alert("Each True/False question must have exactly one correct answer.");
        return;
      }
    }

    // Prepare the data to match the backend structure
    const questionsToSubmit = questions.map(q => ({
      type: q.type,
      text: q.text,
      options: q.options,
      correctAnswers: q.correctAnswers
    }));

    // Save the question bank
    try {
      // Step 1: Create the question bank
      const createdQuestionBank = await axios.post('/api/question-banks', {
        name: questionBankName,
        teacherEmail
      });

      const questionBankId = createdQuestionBank.data.id;

      // Step 2: Save questions to the created question bank
      await axios.post(`/api/questions/${questionBankId}`, questionsToSubmit);
      
      alert("Question bank created successfully!");
      setQuestions([]); // Reset after successful submission
      navigate('/question-bank'); // Redirect to questionbank
    } catch (error) {
      console.error("Error creating question bank:", error);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Create New Question Bank</h1>

      <div className="form-group">
        <label>Question Bank Name:</label>
        <input
          type="text"
          className="form-control"
          value={questionBankName}
          onChange={(e) => setQuestionBankName(e.target.value)}
        />
      </div>

      {questions.map((q, qIndex) => (
        <div key={q.id} className="card p-3 my-3 shadow">
          <select
            className="form-select mb-2"
            value={q.type}
            onChange={(e) => updateQuestion(qIndex, "type", e.target.value)}
          >
            <option value="MCQ">MCQ</option>
            <option value="TrueFalse">True/False</option>
          </select>

          <input
            type="text"
            placeholder="Enter Question"
            value={q.text}
            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
            className="form-control mb-2"
          />

          {/* MCQ Options */}
          {q.type === "MCQ" && q.options.map((opt, oIndex) => (
            <div key={oIndex} className="d-flex align-items-center mb-2">
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                className="form-control me-2"
              />
              <input
                type="checkbox"
                checked={q.correctAnswers.includes(oIndex)}
                onChange={() => toggleCorrectAnswer(qIndex, oIndex)}
              />
            </div>
          ))}

          {/* True/False Options */}
          {q.type === "TrueFalse" && (
            <div className="d-flex flex-column">
              {["True", "False"].map((option, oIndex) => (
                <label key={oIndex}>
                  <input
                    type="radio"
                    name={`trueFalse-${qIndex}`}
                    checked={q.correctAnswers[0] === (option === "True" ? 0 : 1)}
                    onChange={() => setTrueFalseAnswer(qIndex, option)}
                  /> {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={addQuestion} className="btn btn-primary my-3">Add Question</button>

      <button onClick={submitQuestions} className="btn btn-success">Submit Question Bank</button>
    </div>
  );
};

export default CreateQuestionBankPage;
