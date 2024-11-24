import React from "react";
import { Link } from "react-router-dom";

const CurrentEnrollment = () => {
  return (
    <div>
      <h1>Currently Enrolled</h1>
      <button>
        <Link to="/studentpages/AddEnrollment">Add a Course</Link>
      </button>
    </div>
  );
};

export default CurrentEnrollment;