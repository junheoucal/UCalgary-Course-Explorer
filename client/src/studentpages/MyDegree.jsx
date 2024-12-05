import React from "react";
import { Link } from "react-router-dom";

const MyDegree = () => {
  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <h1>My Degree</h1>
      <button>
        <Link to="/studentpages/Major">View My Major</Link>
      </button>
      <button>
        <Link to="/studentpages/Minor">View My Minor</Link>
      </button>
      <button>
        <Link to="/studentpages/home">Back</Link>
      </button>
    </div>
  );
};

export default MyDegree;
