import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const CreateQuiz = () => {
    const [questionBanks, setQuestionBanks] = useState([]);
    const [selectedBankId, setSelectedBankId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [numQuestions, setNumQuestions] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [quizName, setQuizName] = useState('');
    const [equalWeightage, setEqualWeightage] = useState(false); // State for Equal Weightage
    const navigate = useNavigate();

    const teacherEmail = sessionStorage.getItem('teacherEmail');
    const teacherId = sessionStorage.getItem('teacherId');  // Fetch teacher ID from sessionStorage
  
    // Fetch question banks for the logged-in teacher
    useEffect(() => {
        if (teacherEmail) {
            axios.get(`http://localhost:9091/api/question-banks/questionsteacher/${teacherEmail}`)
                .then(response => {
                    setQuestionBanks(response.data);
                })
                .catch(error => console.error("Error fetching question banks:", error));
        }
    }, [teacherEmail]);

    // Fetch questions from the selected question bank
    useEffect(() => {
        if (selectedBankId) {
            axios.get(`http://localhost:9091/api/questions/bank/${selectedBankId}`)
                .then(response => {
                    setQuestions(response.data);
                })
                .catch(error => console.error("Error fetching questions:", error));
        }
    }, [selectedBankId]);

    // Update total marks whenever numQuestions changes
    useEffect(() => {
        if (numQuestions > 0) {
            setTotalMarks(numQuestions * 2); // Total marks = Number of Questions * 2
        }
    }, [numQuestions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (numQuestions <= 0 || numQuestions > questions.length) {
            alert("Please select a valid number of questions.");
            return;
        }

        if (!quizName) {
            alert("Please provide a name for the quiz.");
            return;
        }

        const selectedQuestions = selectRandomQuestions(questions, numQuestions);

        const quizData = {
            quizName: quizName, // Name provided by the teacher
            totalQuestions: numQuestions, // Total number of questions
            totalMarks, // Total marks
            createdBy: teacherEmail, // Teacher's ID from session storage
            questionBankId: selectedBankId, // ID of the selected question bank
            questionIds: selectedQuestions, // Array of selected question IDs
            equalWeightage, // Whether equal weightage is selected or not
            questionMarks: [] // Marks for each question, to be calculated below
        };

        // If equal weightage is selected, set marks for all questions to 2
        if (equalWeightage) {
            quizData.questionMarks = Array(numQuestions).fill(2); // All questions get 2 marks
        } else {
            // Otherwise, use the marks associated with each question
            quizData.questionMarks = selectedQuestions.map(questionId => {
                const question = questions.find(q => q.id === questionId);
                return question ? question.marks : 0; // Use existing marks or 0 if not available
            });
        }

        try {
            // Sending POST request to create the quiz
            await axios.post("http://localhost:9091/api/quizzes/create", quizData);
            alert("Quiz created successfully!");
            navigate('/show-quiz'); // Redirecting to the Show Quiz page
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert("Error creating quiz. Please try again.");
        }
    };

    const selectRandomQuestions = (questions, num) => {
        if (questions.length < num) {
            alert("Not enough questions in the bank.");
            return [];
        }
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num).map(q => q.id); // Return an array of question IDs
    };

    return (
        <Container>
            <h2>Create Quiz</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Quiz Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                        placeholder="Enter a name for the quiz"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select Question Bank</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedBankId}
                        onChange={(e) => setSelectedBankId(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Question Bank --</option>
                        {questionBanks.map(bank => (
                            <option key={bank.id} value={bank.id}>
                                {bank.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Number of Questions</Form.Label>
                    <Form.Control
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(Number(e.target.value))}
                        min={1}
                        max={questions.length}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Marks</Form.Label>
                    <Form.Control
                        type="number"
                        value={totalMarks}
                        readOnly
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Equal Weightage for All Questions"
                        checked={equalWeightage}
                        onChange={(e) => setEqualWeightage(e.target.checked)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!selectedBankId}>
                    Create Quiz
                </Button>
            </Form>
        </Container>
    );
};

export default CreateQuiz;
