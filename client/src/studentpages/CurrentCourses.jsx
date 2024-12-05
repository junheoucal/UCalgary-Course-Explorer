import React from "react";
import { Link } from "react-router-dom";

const CurrentCourses = () => {
  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <h1>Currently Enrolled</h1>
      <button>
        <Link to="/studentpages/AddCurrent">Add a Course</Link>
      </button>
    </div>
  );
};

export default CurrentCourses;
