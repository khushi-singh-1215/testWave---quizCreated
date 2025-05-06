import React from "react";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const studentEmail = sessionStorage.getItem("studentEmail");
  return studentEmail ? children : <Navigate to="/student" />;
};

export default StudentProtectedRoute;
