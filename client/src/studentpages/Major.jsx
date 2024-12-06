import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import "../stylepages/Major.css";

const Major = () => {
  const { auth } = useAuth();
  const [degrees, setDegrees] = useState([]);
  const [requirements, setRequirements] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch majors
        const majorRes = await axios.get(
          "http://localhost:8800/studentpages/Major",
          {
            params: { StudentID: auth.UCID },
          }
        );
        setDegrees(majorRes.data);

        // Fetch requirements for each major
        const requirementsData = {};
        for (const degree of majorRes.data) {
          const reqRes = await axios.get(
            `http://localhost:8800/studentpages/MajorRequirements/${degree.Major}/${auth.UCID}`
          );
          requirementsData[degree.Major] = reqRes.data;
        }
        setRequirements(requirementsData);
      } catch (err) {
        console.error(
          "Error fetching:",
          err.response ? err.response.data : err.message
        );
      }
    };
    fetchData();
  }, [auth.UCID]);

  const handleDelete = async (major) => {
    try {
      await axios.delete(
        `http://localhost:8800/studentpages/Major/${major}/${auth.UCID}`
      );
      window.location.reload();
    } catch (err) {
      console.error(
        "Error deleting major:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const calculateProgress = (courses) => {
    if (!courses || courses.length === 0) return 0;
    const completed = courses.filter((course) => course.is_completed).length;
    return Math.round((completed / courses.length) * 100);
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <div className="main-container">
        <h1>Major List</h1>
        <div className="degrees">
          {degrees.map((degree) => (
            <div
              className="degree-card"
              key={`${degree.StudentID}-${degree.Major}`}
            >
              <div className="degree-header">
                <h2>{degree.Major}</h2>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(degree.Major)}
                >
                  x
                </button>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${calculateProgress(requirements[degree.Major])}%`,
                  }}
                />
                <span className="progress-text">
                  {calculateProgress(requirements[degree.Major])}% Complete
                </span>
              </div>

              <div className="requirements-list">
                <h3>Required Courses:</h3>
                {requirements[degree.Major]?.map((course) => (
                  <div
                    key={course.CourseID}
                    className={`requirement-item ${
                      course.is_completed ? "completed" : "pending"
                    }`}
                  >
                    <Link to={`/studentpages/CoursePage/${course.CourseID}`}>
                      <span className="course-id">{course.CourseID}</span>
                      <span className="course-separator"> - </span>
                      <span className="course-name">{course.Course_Name}</span>
                    </Link>
                    <span className="status-indicator">
                      {course.is_completed ? " ✓" : " ○"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Link to="/studentpages/addmajor" className="add-card">
            <div className="add-icon">+</div>
            <div className="add-text">Add Major</div>
          </Link>
        </div>
        <button>
          <Link to="/studentpages/MyDegree">Back to My Degree</Link>
        </button>
      </div>
    </div>
  );
};

export default Major;
