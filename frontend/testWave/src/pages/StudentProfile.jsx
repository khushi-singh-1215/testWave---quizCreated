import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("studentEmail") || "");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:9091/api/student/email/${email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Profile not found");
          return res.json();
        })
        .then((data) => setStudent(data))
        .catch(() => setStudent(null));
    }
  }, [email]);

  const handleCreateProfile = (e) => {
    e.preventDefault();

    fetch("http://localhost:9091/api/student/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setSuccessMessage("🎉 Profile created successfully!");
      })
      .catch(() => setSuccessMessage("❌ Failed to create profile"));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <div className="text-center">
        <h3>👤</h3>
          <h3>{student ? "Student Profile" : "Create Student Profile"}</h3>
        </div>

        {successMessage && (
          <Alert variant={successMessage.includes("successfully") ? "success" : "danger"}>
            {successMessage}
            {student && (
              <div className="mt-2">
                <strong>Assigned ID:</strong> {student.studentId}
              </div>
            )}
          </Alert>
        )}

        {!student ? (
          <Form onSubmit={handleCreateProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email || ""}
                disabled
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Create Profile
            </Button>
          </Form>
        ) : (
          <>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
          </>
        )}
      </Card>
    </Container>
  );
};

export default StudentProfile;
