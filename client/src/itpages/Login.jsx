import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../stylepages/Login.css";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [UCID, setUCID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!UCID || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8800/itlogin", {
        UCID,
        password,
      });

      if (response.data.success) {
        // Update auth context with new data
        setAuth({
          UCID: response.data.userID,
          userType: "it",
          isAuthenticated: true,
        });

        // Use navigate instead of window.location
        navigate("/itpages/course");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <h1>IT Login</h1>
          <div className="login-page">
            <div>
              <label htmlFor="UCID"></label>
              <input
                type="text"
                placeholder="Enter UCID"
                value={UCID}
                onChange={(e) => setUCID(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
