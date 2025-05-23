import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "../stylepages/Login.css";

const LOGIN_URL = "/studentlogin";
function Login() {
  const { setAuth } = useContext(AuthContext);
  const [UCID, setUCID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!UCID || !password) {
      setError("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:8800/studentlogin", { UCID, password })
      .then((res) => {
        if (res.data.success) {
          setAuth({
            userID: res.data.userID,
            userType: "student",
            isAuthenticated: true,
          });

          localStorage.setItem("userID", res.data.userID);
          localStorage.setItem("userType", "student");

          window.location.href = "/studentpages/home";
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError("An error occurred during login");
        console.log(err);
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

      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <h1>Student Login</h1>
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
