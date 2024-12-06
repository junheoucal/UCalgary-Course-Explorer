import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import "../stylepages/Major.css";

const Minor = () => {
  const { auth } = useAuth();
  const [degrees, setDegrees] = useState([]);
  const [requirements, setRequirements] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch minors
        const minorRes = await axios.get(
          "http://localhost:8800/studentpages/Minor",
          {
            params: { StudentID: auth.UCID },
          }
        );
        setDegrees(minorRes.data);

        // Fetch requirements for each minor
        const requirementsData = {};
        for (const degree of minorRes.data) {
          const reqRes = await axios.get(
            `http://localhost:8800/studentpages/MinorRequirements/${degree.Minor}/${auth.UCID}`
          );
          requirementsData[degree.Minor] = reqRes.data;
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

  const handleDelete = async (minor) => {
    try {
      await axios.delete(
        `http://localhost:8800/studentpages/Minor/${minor}/${auth.UCID}`
      );
      window.location.reload();
    } catch (err) {
      console.error(
        "Error deleting minor:",
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
        <h1>Minor List</h1>
        <div className="degrees">
          {degrees.map((degree) => (
            <div
              className="degree-card"
              key={`${degree.StudentID}-${degree.Minor}`}
            >
              <h2>{degree.Minor}</h2>
              <button
                className="delete-button"
                onClick={() => handleDelete(degree.Minor)}
              >
                x
              </button>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${calculateProgress(requirements[degree.Minor])}%`,
                  }}
                />
                <span className="progress-text">
                  {calculateProgress(requirements[degree.Minor])}% Complete
                </span>
              </div>

              <div className="requirements-list">
                <h3>Required Courses:</h3>
                {requirements[degree.Minor]?.map((course) => (
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
          <Link to="/studentpages/addminor" className="add-card">
            <div className="add-icon">+</div>
            <div className="add-text">Add Minor</div>
          </Link>
        </div>
        <button>
          <Link to="/studentpages/MyDegree">Back To My Degree</Link>
        </button>
      </div>
    </div>
  );
};

export default Minor;
