import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        backgroundImage: "url(/bgimg1.jpg)", // Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top layout (Sidebar + Main content) */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-dark text-white p-3 d-flex flex-column align-items-center" style={{ width: "250px" }}>
          <h2 className="text-center">TESTWAVE</h2>
          <p className="mt-3">👤 Teacher</p>
          <nav className="w-100">
            <Link className="d-block text-white p-2 text-decoration-none" to="/profile">👩‍🏫 Profile</Link>
            <Link className="d-block text-white p-2 text-decoration-none" to="/question-bank">📚 Question Banks</Link>
            <Link className="d-block text-white p-2 text-decoration-none" to="/show-quiz">❓ View Quizzes</Link>
            <Link className="d-block text-white p-2 text-decoration-none" to="/results">🎓 Results</Link>
          </nav>
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4 d-flex align-items-center justify-content-center">
          <div className="row g-4 w-75">
            {[
              { title: "Create Quiz", route: "/create-quiz" },
              //{ title: "Add Question to Previous Quiz", route: "/add-question" },
              { title: "Update Quizzes", route: "/previous-quizzes" },
            ].map((item, index) => (
              <div key={index} className="col-md-4-mb-4">
                <div
                  className="card p-5 shadow text-center border-0 fs-4 bg-dark text-white"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.3s, background-color 0.3s",
                    //background: "#A67C52",
                    height: "70px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onClick={() => navigate(item.route)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    //e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <h4 className="m-0">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  };
export default Dashboard;