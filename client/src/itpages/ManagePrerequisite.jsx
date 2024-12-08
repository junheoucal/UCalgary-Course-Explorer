import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../stylepages/ManageReq.css";

const AddPrerequisite = () => {
  const [courses, setCourses] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const { CourseID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all courses
        const coursesRes = await axios.get("http://localhost:8800/course");
        const filteredCourses = coursesRes.data.filter(
          (course) => course.CourseID !== CourseID
        );
        setCourses(filteredCourses);

        // Fetch prerequisites
        const prereqRes = await axios.get(
          `http://localhost:8800/prerequisite/${CourseID}`
        );
        setPrerequisites(prereqRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [CourseID]);

  const handleAddPrerequisite = async (requiredCourseID) => {
    try {
      await axios.post("http://localhost:8800/prerequisite", {
        CourseID: CourseID,
        Required_CourseID: requiredCourseID,
      });
      // Refresh prerequisites list
      const prereqRes = await axios.get(
        `http://localhost:8800/prerequisite/${CourseID}`
      );
      setPrerequisites(prereqRes.data);
      alert("Prerequisite added successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to add prerequisite");
    }
  };

  const handleRemovePrerequisite = async (requiredCourseID) => {
    try {
      await axios.delete(
        `http://localhost:8800/prerequisite/${CourseID}/${requiredCourseID}`
      );
      // Refresh prerequisites list
      const prereqRes = await axios.get(
        `http://localhost:8800/prerequisite/${CourseID}`
      );
      setPrerequisites(prereqRes.data);
      alert("Prerequisite removed successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to remove prerequisite");
    }
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
          <Link to="/itpages/Course">Back to Course List</Link>
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        <h1>Prerequisites for Course {CourseID}</h1>

        {/* Current Prerequisites Section */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Current Prerequisites</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {prerequisites.map((prereq) => (
              <div
                key={prereq.Required_CourseID}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <span>
                  {prereq.Required_CourseID} - {prereq.Course_Name}
                </span>
                <button
                  onClick={() =>
                    handleRemovePrerequisite(prereq.Required_CourseID)
                  }
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            {prerequisites.length === 0 && <p>No prerequisites set</p>}
          </div>
        </div>

        {/* Available Courses Section */}
        <h2>Add New Prerequisites</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {courses.map((course) => (
            <div
              key={course.CourseID}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 10px 0" }}>{course.CourseID}</h2>
                <h3 style={{ margin: "0 0 10px 0" }}>{course.Course_Name}</h3>
                <p style={{ margin: "5px 0" }}>Level: {course.Level}</p>
                <p style={{ margin: "5px 0" }}>
                  Description: {course.Course_Description}
                </p>
                <p style={{ margin: "5px 0" }}>Credits: {course.Credits}</p>
                <p style={{ margin: "5px 0" }}>
                  Department: {course.Department_Name}
                </p>
                <p style={{ margin: "5px 0" }}>
                  Concentration: {course.Concentration_Name}
                </p>
              </div>
              <button
                onClick={() => handleAddPrerequisite(course.CourseID)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add as Prerequisite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPrerequisite;
