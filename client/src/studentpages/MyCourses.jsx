import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import "../stylepages/MyCourses.css";

const MyCourses = () => {
  const { auth } = useAuth();
  const [pastCourses, setPastCourses] = useState([]);

  useEffect(() => {
    const fetchAllPastCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/studentpages/PastCourses",
          {
            params: { StudentID: auth.UCID },
          }
        );
        setPastCourses(res.data);
      } catch (err) {
        console.error(
          "Error fetching past courses:",
          err.response ? err.response.data : err.message
        );
      }
    };
    fetchAllPastCourses();
  }, [auth.UCID]);

  const renderList = (items) => {
    if (!items) return "None";
    const itemList = items.split(",");
    return itemList.length > 0 ? (
      <ul className="course-list">
        {itemList.map((item, index) => (
          <li key={index}>
            <Link to={`/studentpages/CoursePage/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    ) : (
      "None"
    );
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
        <button className="back-btn">
          <Link to="/studentpages/home">Back</Link>
        </button>
      </div>

      <div className="courses-container">
        <h1>List of Courses Taken</h1>
        <div className="past-courses">
          {pastCourses.map((pastCourse) => (
            <div className="course-card" key={pastCourse.CourseID}>
              <div className="course-detail">
                <span className="label">Course:</span>
                <span className="value">{pastCourse.CourseID || "N/A"}</span>
              </div>
              <div className="course-detail">
                <span className="label">Name:</span>
                <span className="value">{pastCourse.Course_Name || "N/A"}</span>
              </div>
              <div className="course-detail">
                <span className="label">Level:</span>
                <span className="value">{pastCourse.Level || "N/A"}</span>
              </div>
              <div className="course-detail">
                <span className="label">Description:</span>
                <span className="value">
                  {pastCourse.Course_Description || "N/A"}
                </span>
              </div>
              <div className="course-detail">
                <span className="label">Credits:</span>
                <span className="value">{pastCourse.Credits || "N/A"}</span>
              </div>
              <div className="course-detail">
                <span className="label">Department:</span>
                <span className="value">
                  {pastCourse.Department_Name || "N/A"}
                </span>
              </div>
              <div className="course-detail">
                <span className="label">Prerequisite to:</span>
                <span className="value">
                  {renderList(pastCourse.Prerequisites)}
                </span>
              </div>
              <div className="course-detail">
                <span className="label">Antirequisite of:</span>
                <span className="value">
                  {renderList(pastCourse.Antirequisites)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
