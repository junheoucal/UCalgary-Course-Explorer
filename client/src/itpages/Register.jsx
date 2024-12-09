import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../stylepages/Register.css";

function Register() {
  const [UCID, setUCID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!UCID || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // You might want to add more validation here
    // e.g., UCID format, password strength, etc.

    axios
      .post("http://localhost:8800/itregister", { UCID, password })
      .then((res) => {
        console.log("Registration response:", res.data);
        if (res.data.success) {
          setSuccess("Registration successful! You can now login.");
          // Clear form
          setUCID("");
          setPassword("");
          setConfirmPassword("");
          // Optionally redirect to login page after a delay
          setTimeout(() => {
            window.location.href = "./login";
          }, 2000);
        } else {
          setError(res.data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError("An error occurred during registration");
      });
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
        <button className="back-btn">
          <Link to="/Home">Back</Link>
        </button>
      </div>

      <h1>IT Staff Registration</h1>
      <div className="register-container">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="UCID"></label>
            <input
              type="text"
              id="UCID"
              value={UCID}
              onChange={(e) => setUCID(e.target.value)}
              placeholder="Enter your UCID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>

      <div className="login-text">
        Already have an account?
        <a href="./login" className="login-link">
          Login here
        </a>
      </div>
    </div>
  );
}

export default Register;
