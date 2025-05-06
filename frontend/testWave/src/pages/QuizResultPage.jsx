// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';

// const QuizResultPage = () => {
//     const [score, setScore] = useState(null);
//     const [total, setTotal] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const navigate = useNavigate();
//     const quizCode = "8D1FE029"; // Replace with dynamic quiz code
//     const studentEmail = "student@example.com"; // Replace with dynamic student email

//     useEffect(() => {
//         // Make the API call to fetch results once the component mounts
//         const fetchResults = async () => {
//             try {
//                 const response = await axios.post('http://localhost:9091/api/quizzes/submit', {
//                     studentEmail,
//                     quizCode,
//                     answers: [] // Replace with the answers dynamically
//                 });

//                 // Extract the result message from the response
//                 const resultMessage = response.data; // Assuming backend returns a string like "You scored 10 out of 20"
//                 const score = resultMessage.match(/\d+/g)[0]; // Extract the score number
//                 const total = resultMessage.match(/\d+/g)[1]; // Extract the total number

//                 // Set state for score and total
//                 setScore(score);
//                 setTotal(total);

//                 // Show the modal after quiz submission
//                 setShowModal(true);

//                 // Optionally, you can redirect to another page if needed
//                 // navigate(`/quiz-results/${quizCode}`);

//             } catch (error) {
//                 console.error('Error submitting quiz:', error);
//             }
//         };

//         fetchResults();
//     }, [quizCode, studentEmail]); // Re-run this effect if quizCode or studentEmail changes

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div className="container mt-5">
//             <h3>Quiz Result</h3>
//             {/* Display score only if it's available */}
//             {score !== null && total !== null ? (
//                 <>
//                     <h4>Your Score: {score} / {total}</h4>
//                     <Button variant="primary" onClick={() => navigate("/quiz-results")}>
//                         View Full Results
//                     </Button>
//                 </>
//             ) : (
//                 <p>Loading your results...</p>
//             )}

//             {/* Modal to show the quiz result */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Quiz Submission Result</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <h5>You scored {score} out of {total}</h5>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleCloseModal}>
//                         View Full Results
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default QuizResultPage;
