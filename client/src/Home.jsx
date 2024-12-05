import React from "react";
import { Link } from "react-router-dom";
import "./stylepages/Home.css";

function Home() {
  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <div className="main-content">
        <h1 className="home-title">Course Search Engine</h1>

        <div className="login-container">
          <div className="student-section">
            <h2>Students</h2>
            <button className="student-login-button">
              <Link to="/studentpages/Login">Student Login</Link>
            </button>
            <button className="student-register-button">
              <Link to="/studentpages/Register">New Student Registration</Link>
            </button>
          </div>

          <div className="it-section">
            <h2>IT Staff</h2>
            <button className="it-login-button">
              <Link to="/itpages/Login">IT Login</Link>
            </button>
            <button className="it-register-button">
              <Link to="/itpages/Register">IT Registration</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
