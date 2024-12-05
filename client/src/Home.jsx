import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="home-title">Course Search Engine</h1>
      <div className="login-buttons">
        <div className="student-section">
          <button>
            <Link to="/studentpages/Login">Student Login</Link>
          </button>
          <button>
            <Link to="/studentpages/Register">Student Registration</Link>
          </button>
        </div>
        <div className="it-section">
          <button>
            <Link to="/itpages/Login">IT Login</Link>
          </button>
          <button>
            <Link to="/itpages/Register">IT Registration</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
