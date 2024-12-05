import React from "react";
import { Link } from "react-router-dom";

const CurrentCourses = () => {
  return (
    <div>
      <h1>Currently Enrolled</h1>
      <button>
        <Link to="/studentpages/AddCurrent">Add a Course</Link>
      </button>
    </div>
  );
};

export default CurrentCourses;
