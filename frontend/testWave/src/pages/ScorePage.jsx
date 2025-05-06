import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const ScorePage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const email = sessionStorage.getItem("studentEmail"); // ✅ dynamically fetched

        if (!email) {
            console.warn("No studentEmail found in sessionStorage");
            return;
        }

        axios.get(`http://localhost:9091/api/quizzes/results/student/${email}`)
            .then(res => {
                const latestFive = res.data.slice(-5).reverse(); // Last 5 results
                setResults(latestFive);
            })
            .catch(err => {
                console.error("Failed to fetch quiz results:", err);
                setResults([]);
            });
    }, []);

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Your Last 5 Quiz Results</h2>
            {results.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Quiz Title</th>
                            <th>Attempted Date</th>
                            <th>Attempted Time</th>
                            <th>Score</th>
                            <th>Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            const submissionDate = new Date(result.submissionDate);
                            const attemptedDate = submissionDate.toLocaleDateString(); // Only Date
                            const attemptedTime = submissionDate.toLocaleTimeString(); // Only Time
                            return (
                                <tr key={result.id}>
                                    <td>{index + 1}</td>
                                    <td>{result.quiz?.quizName || 'N/A'}</td>
                                    <td>{attemptedDate}</td>
                                    <td>{attemptedTime}</td>
                                    <td>{result.score}</td>
                                    <td>{result.total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No quiz results available.</p>
            )}
        </Container>
    );
};

export default ScorePage;
