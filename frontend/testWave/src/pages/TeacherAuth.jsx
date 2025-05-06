import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherAuth = () => {
  const [view, setView] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  const handleSignupEmail = async () => {
    clearMessages();
    try {
      await axios.post("http://localhost:9091/api/auth/send-signup-otp", {
        email: formData.email,
        role: "TEACHER",
      });
      setMessage("OTP sent to your email");
      setView("otpSignup");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleVerifySignupOtp = async () => {
    clearMessages();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:9091/api/auth/verify-signup-otp", {
        email: formData.email,
        password: formData.password,
        otp: formData.otp.trim(),
        role: "TEACHER",
      });
      sessionStorage.setItem("teacherEmail", formData.email); // Set email in session
      setMessage("Signup successful!");
      setView("login");
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };

  const handleLogin = async () => {
    clearMessages();
    try {
      const res = await axios.post("http://localhost:9091/api/auth/login", {
        email: formData.email,
        password: formData.password,
        role: "TEACHER",
      });

      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
      sessionStorage.setItem("teacherEmail", formData.email); // Save on login too
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      setError(err.response?.data?.error || "Invalid login");
    }
  };

  const handleSendResetOtp = async () => {
    clearMessages();
    try {
      await axios.post("http://localhost:9091/api/auth/forgot-password", {
        email: formData.email,
      });
      setMessage("OTP sent to your email");
      setView("otpReset");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyResetOtp = async () => {
    clearMessages();
    try {
      await axios.post("http://localhost:9091/api/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      sessionStorage.setItem("teacherEmail", formData.email); // Save here too
      setView("reset");
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };

  const handleResetPassword = async () => {
    clearMessages();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:9091/api/auth/reset-password", {
        email: formData.email,
        newPassword: formData.password,
      });
      setMessage("Password updated. Please login.");
      setView("login");
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("/bgimg1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container p-4 rounded shadow bg-white" style={{ maxWidth: "500px", opacity: 0.95 }}>
        <h3 className="text-center mb-4">Teacher Portal - Testwave</h3>

        <div className="d-flex justify-content-around mb-4">
          <button
            className={`btn btn-outline-primary ${view === "login" ? "active" : ""}`}
            onClick={() => setView("login")}
          >
            Login
          </button>
          <button
            className={`btn btn-outline-success ${view === "signup" ? "active" : ""}`}
            onClick={() => setView("signup")}
          >
            Signup
          </button>
          <button
            className={`btn btn-outline-warning ${view === "forgot" ? "active" : ""}`}
            onClick={() => setView("forgot")}
          >
            Forgot Password
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {view === "login" && (
          <>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />
            <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
          </>
        )}

        {view === "signup" && (
          <>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
            <button className="btn btn-success w-100" onClick={handleSignupEmail}>Send OTP</button>
          </>
        )}

        {view === "otpSignup" && (
          <>
            <input type="text" name="otp" className="form-control mb-2" placeholder="Enter OTP" onChange={handleChange} />
            <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" className="form-control mb-2" placeholder="Confirm Password" onChange={handleChange} />
            <button className="btn btn-success w-100" onClick={handleVerifySignupOtp}>Verify OTP & Register</button>
          </>
        )}

        {view === "forgot" && (
          <>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
            <button className="btn btn-warning w-100" onClick={handleSendResetOtp}>Send OTP</button>
          </>
        )}

        {view === "otpReset" && (
          <>
            <input type="text" name="otp" className="form-control mb-2" placeholder="Enter OTP" onChange={handleChange} />
            <button className="btn btn-warning w-100" onClick={handleVerifyResetOtp}>Verify OTP</button>
          </>
        )}

        {view === "reset" && (
          <>
            <input type="password" name="password" className="form-control mb-2" placeholder="New Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" className="form-control mb-2" placeholder="Confirm Password" onChange={handleChange} />
            <button className="btn btn-warning w-100" onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherAuth;
