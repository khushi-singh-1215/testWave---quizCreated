import React from "react";
import { Navigate } from "react-router-dom";

const TeacherProtectedRoute = ({ children }) => {
  const teacherEmail = sessionStorage.getItem("teacherEmail");
  return teacherEmail ? children : <Navigate to="/teacher" />;
};

export default TeacherProtectedRoute;
