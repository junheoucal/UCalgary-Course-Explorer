import React from "react";
import { Link } from "react-router-dom";
import "../stylepages/StudentHome.css";

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
      <div className="student-home">
        <h1>My Degree</h1>
        <button className="student-button">
          <Link to="/studentpages/Major">View My Major</Link>
        </button>
        <button className="student-button">
          <Link to="/studentpages/Minor">View My Minor</Link>
        </button>
      </div>
    </div>
  );
};

export default MyDegree;
