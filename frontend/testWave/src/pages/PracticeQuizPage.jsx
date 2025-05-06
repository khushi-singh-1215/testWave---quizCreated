import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PracticeQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9091/api/practice-quiz/random')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const nextQuestion = () => {
    setAnswers([
      ...answers,
      {
        questionId: questions[currentQuestion]?.id,
        selectedAnswer,
        correctAnswerIndex: questions[currentQuestion]?.correctAnswers[0]?.answerIndex,
      },
    ]);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    fetch('http://localhost:9091/api/practice-quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentEmail: 'test@example.com',
        answers: answers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.score !== undefined && data.total !== undefined) {
          setResult(data);
        } else {
          console.error('Invalid response format', data);
        }
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
      });
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="container mt-5">
      <h3>
        Question {currentQuestion + 1} / {questions.length}
      </h3>
      <p>{questions[currentQuestion]?.text}</p>
      {questions[currentQuestion]?.options.map((option, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name="answer"
            id={`option-${index}`}
            value={option.optionText}
            checked={selectedAnswer === option.optionText}
            onChange={() => setSelectedAnswer(option.optionText)}
          />
          <label className="form-check-label" htmlFor={`option-${index}`}>
            {option.optionText}
          </label>
        </div>
      ))}
      <p>Time left: {timer} seconds</p>
      <button className="btn btn-primary mt-3" onClick={nextQuestion}>
        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
      </button>

      {result && (
        <div className="mt-5">
          <h4>Your Score: {result.score} / {result.total}</h4>
        </div>
      )}
    </div>
  );
};

export default PracticeQuizPage;
