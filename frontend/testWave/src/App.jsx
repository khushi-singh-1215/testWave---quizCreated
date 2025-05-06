import React from 'react'
import { Routes, Route } from "react-router-dom";
import RoleSelection from './pages/RoleSelection';
import StudentAuth from './pages/StudentAuth';
import TeacherAuth from './pages/TeacherAuth';
import OtpVerification from './pages/OtpVerification';
import Dashboard from './pages/Dashboard';
import CreateQuestionBank from './pages/CreateQuestionBank';
import ResultsPage from './pages/ResultsPage';
import TeacherProfile from './pages/TeacherProfile';
import ActiveTests from './pages/ActiveTests';
import CreateQuiz from './pages/CreateQuiz';
import StudentDashboard from './pages/StudentDashboard';
import ActiveQuizzes from './pages/ActiveQuizzes';
import ScorePage from "./pages/ScorePage"; 
import ShowQuiz from './pages/ShowQuiz';
import ShowParticularQuiz from './pages/ShowParticularQuiz';
import QuizInstructionsPage from "./pages/QuizInstructionsPage";
import QuizPage from "./pages/QuizPage";
import PracticeInstructionsPage from "./pages/PracticeInstructionsPage"
import PracticeQuizPage from "./pages/PracticeQuizPage"
import StudentProfile from "./pages/StudentProfile"
// import QuizResultPage from "./pages/QuizResultPage";
import StudentResult from "./pages/StudentResult";
import PreviousQuizzes from './pages/PreviousQuizzes';
import QuestionBankPage from './pages/QuestionBankPage';
import CreateQuestionBankPage from './pages/CreateQuestionBankPage';

import TeacherProtectedRoute from './pages/TeacherProtectedRoute';
import StudentProtectedRoute from './pages/StudentProtectedRoute';
import ViewQuestionBank from './pages/ViewQuestionBank';
import EditQuestionBankPage from './pages/EditQuestionBankPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<RoleSelection/>} />
        <Route path="/student" element={<StudentAuth />} />
        <Route path="/teacher" element={<TeacherAuth />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* Teacher Protected Routes */}
        <Route path="/dashboard" element={<TeacherProtectedRoute><Dashboard /></TeacherProtectedRoute>} />
        {/* <Route path="/question-bank" element={<TeacherProtectedRoute><CreateQuestionBank /></TeacherProtectedRoute>} /> */}
        <Route path="/results" element={<TeacherProtectedRoute><ResultsPage /></TeacherProtectedRoute>} />
        <Route path="/profile" element={<TeacherProtectedRoute><TeacherProfile /></TeacherProtectedRoute>} />
        <Route path="/active-quiz" element={<TeacherProtectedRoute><ActiveTests /></TeacherProtectedRoute>} />
        <Route path="/create-quiz" element={<TeacherProtectedRoute><CreateQuiz /></TeacherProtectedRoute>} />
        <Route path="/show-quiz" element={<TeacherProtectedRoute><ShowQuiz/></TeacherProtectedRoute>} />
        <Route path="/quiz/:id" element={<TeacherProtectedRoute><ShowParticularQuiz /></TeacherProtectedRoute>} />
        <Route path="/question-bank" element={<TeacherProtectedRoute><QuestionBankPage /></TeacherProtectedRoute>} />
        <Route path="/create-question-bank" element={<TeacherProtectedRoute><CreateQuestionBankPage /></TeacherProtectedRoute>} />
        <Route path="/view-question-bank/:id" element={<TeacherProtectedRoute><ViewQuestionBank /></TeacherProtectedRoute>} />
        <Route path="/edit-question-bank/:id" element={<TeacherProtectedRoute><EditQuestionBankPage /></TeacherProtectedRoute>} />

        
        {/* Student Protected Routes */}
        <Route path="/studentdashboard" element={<StudentProtectedRoute><StudentDashboard/></StudentProtectedRoute>} />
        <Route path="/active-quizzes" element={<StudentProtectedRoute><ActiveQuizzes/></StudentProtectedRoute>} />
        <Route path="/scores" element={<StudentProtectedRoute><ScorePage/></StudentProtectedRoute>} />
        <Route path="/quiz-instructions" element={<StudentProtectedRoute><QuizInstructionsPage /></StudentProtectedRoute>} />
        <Route path="/quiz" element={<StudentProtectedRoute><QuizPage /></StudentProtectedRoute>} />
        <Route path="/practice-quiz-inst" element={<StudentProtectedRoute><PracticeInstructionsPage /></StudentProtectedRoute>} />
        <Route path="/practice-quiz" element={<StudentProtectedRoute><PracticeQuizPage /></StudentProtectedRoute>} />
        <Route path="/student-profile" element={<StudentProtectedRoute><StudentProfile /></StudentProtectedRoute>} />
        {/* <Route path="/quiz-results" element={<QuizResultPage />} /> */}
        <Route path="/results" element={<StudentProtectedRoute><StudentResult /></StudentProtectedRoute>} />
        <Route path="/previous-quizzes" element={<StudentProtectedRoute><PreviousQuizzes /></StudentProtectedRoute>} />  
    </Routes>
  );
}

export default App
