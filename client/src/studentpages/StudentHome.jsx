import React from "react";
import { Link } from "react-router-dom";

const StudentHome = () => {
  return (
    <div className="student-home">
      <h1>Student Home Page</h1>
      <button>
        <Link to="/studentpages/MyCourses">My Courses</Link>
      </button>
      <button>
        <Link to="/studentpages/CourseSearch">Course Search</Link>
      </button>
      <button>
        <Link to="/studentpages/MyDegree">My Degree</Link>
      </button>
    </div>
  );
};

export default StudentHome;