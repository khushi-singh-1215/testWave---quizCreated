import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("teacherEmail") || "");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:9091/api/teacher/email/${email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Profile not found");
          return res.json();
        })
        .then((data) => setTeacher(data))
        .catch(() => setTeacher(null));
    }
  }, [email]);

  const handleCreateProfile = (e) => {
    e.preventDefault();

    fetch("http://localhost:9091/api/teacher/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data);
        setSuccessMessage("🎉 Profile created successfully!");
      })
      .catch(() => setSuccessMessage("❌ Failed to create profile"));
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <div className="text-center">
          <h3>👤</h3>
          <h3>{teacher ? "Teacher Profile" : "Create Teacher Profile"}</h3>
        </div>

        {successMessage && (
          <Alert variant={successMessage.includes("successfully") ? "success" : "danger"}>
            {successMessage}
            {teacher && (
              <div className="mt-2">
                <strong>Assigned ID:</strong> {teacher.teacherId}
              </div>
            )}
          </Alert>
        )}

        {!teacher ? (
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
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Teacher ID:</strong> {teacher.teacherId}</p>
          </>
        )}
      </Card>
    </Container>
  );
};

export default TeacherProfile;
