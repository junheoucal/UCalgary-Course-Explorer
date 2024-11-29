import React from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  return (
    <div>
      <h1>My Courses</h1>
      {/* <button>
        <Link to="/studentpages/CurrentEnrollment">Current Courses</Link>
      </button> */}
      <button>
        <Link to="/studentpages/PastCourses">View My Past Courses</Link>
      </button>
      <button>
        <Link to="/studentpages/home">Back</Link>
      </button>
    </div>
  );
};



export default MyCourses;