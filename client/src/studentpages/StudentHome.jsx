import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const StudentHome = () => {
  const { auth } = useAuth();
  return (
    console.log(auth.UCID),
    (
      <div className="ucalgary-container">
        <div className="header">
          <img
            src="/uofc-logo.png"
            alt="University of Calgary Logo"
            className="ucalgary-logo"
          />
        </div>

        <h1>Student Home Page</h1>
        <div className="student-home">
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
      </div>
    )
  );
};

export default StudentHome;
