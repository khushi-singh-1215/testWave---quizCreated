import React from "react";
import { useNavigate } from "react-router-dom";
import studentIcon from "./student.png";
import teacherIcon from "./teacher.jpeg";


const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div
            className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100"
            style={{
                backgroundImage: 'url("/bgimg1.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="bg-white p-4 rounded shadow" style={{ opacity: 0.95 }}>
                <h2 className="mb-4 text-center">Select Your Role</h2>
                <div className="d-flex gap-5">
                    <div className="text-center">
                        <img src={studentIcon} alt="Student" className="mb-3" width={120} height={120} />
                        <button className="btn btn-primary w-100" onClick={() => navigate("/student")}>
                            I'm a Student
                        </button>
                    </div>
                    <div className="text-center">
                        <img src={teacherIcon} alt="Teacher" className="mb-3" width={120} height={120} />
                        <button className="btn btn-success w-100" onClick={() => navigate("/teacher")}>
                            I'm a Teacher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
