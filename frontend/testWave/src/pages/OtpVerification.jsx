import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

const API_BASE_URL = "http://localhost:9091/api/auth";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); // role can be 'teacher' or 'student'
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });

            if (response.data.message === "OTP verified. You can now reset your password!") {
                setMessage("OTP Verified! Please enter a new password.");
                setStep(2);
            } else {
                setError("Invalid OTP, please try again.");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong.");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!role) {
            setError("Please select your role.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/reset-password`, { email, newPassword });
            setMessage("Password reset successfully! Redirecting...");

            setTimeout(() => {
                navigate(role === "teacher" ? "/dashboard" : "/studentdashboard");
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4 shadow-lg" style={{ width: "40%" }}>
                <h2 className="text-center">{step === 1 ? "Enter OTP" : "Reset Password"}</h2>

                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                {step === 1 ? (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordReset}>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter new password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm new password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Role</label>
                            <select
                                className="form-select"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">-- Select Role --</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OtpVerification;
