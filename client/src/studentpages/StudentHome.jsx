import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import "../stylepages/StudentHome.css";

const StudentHome = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/student/${auth.UCID}`);
        setStudentInfo(response.data[0]);
      } catch (err) {
        console.error("Error fetching student info:", err);
      }
    };

    fetchStudentInfo();
  }, [auth.UCID]);

  const handleLogout = () => {
    setAuth({
      UCID: null,
      userType: null,
      isAuthenticated: false
    });
    navigate('/login');
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1>Student Home Page</h1>
      {studentInfo && (
        <h2>Welcome, {studentInfo.First_Name} {studentInfo.Last_Name}!</h2>
      )}
      <div className="student-home">
        <button className="student-button">
          <Link to="/studentpages/MyCourses">My Courses</Link>
        </button>
        <button className="student-button">
          <Link to="/studentpages/CourseSearch">Course Search</Link>
        </button>
        <button className="student-button">
          <Link to="/studentpages/MyDegree">My Degree</Link>
        </button>
      </div>
    </div>
  );
};

export default StudentHome;
