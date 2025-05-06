//olderrr
import React, { useState } from "react";
import axios from "axios";

const CreateQuestionBank = () => {
  const [questions, setQuestions] = useState([]);

  // Add a new question
  const addQuestion = () => {
    if (questions.length < 100) {
      setQuestions([
        ...questions,
        { 
          id: Date.now(), // Unique ID for React rendering stability
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
    
    // Reset correctAnswers if type is changed to True/False
    if (field === "type" && value === "TrueFalse") {
      newQuestions[index].correctAnswers = [];
    }

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
      // Remove option if already selected
      newQuestions[qIndex].correctAnswers = correctAnswers.filter(ans => ans !== oIndex);
    } else {
      // Add option if not selected
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

    try {
      const response = await axios.post('http://localhost:9091/api/questions', questionsToSubmit, {
        headers: { "Content-Type": "application/json" }
      });
      alert(response.data.message || "Questions submitted successfully!"); // Success message
      setQuestions([]); // Clear after successful submission
    } catch (error) {
      console.error("Error submitting questions", error);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Create Question Bank</h1>
      
      
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

      <button onClick={submitQuestions} className="btn btn-success">Submit Questions</button>
    </div>
  );
};

export default CreateQuestionBank;