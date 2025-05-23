import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../stylepages/ManageReq.css";

const AddPrerequisite = () => {
  const [courses, setCourses] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const { CourseID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get("http://localhost:8800/course", {
          params: {
            searchTerm: searchTerm,
            department: department,
          },
        });
        const filteredCourses = coursesRes.data.filter(
          (course) => course.CourseID !== CourseID
        );
        setCourses(filteredCourses);

        const prereqRes = await axios.get(
          `http://localhost:8800/prerequisite/${CourseID}`
        );
        setPrerequisites(prereqRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [CourseID, searchTerm, department]);

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

        {/* Add search and filter controls */}
        <h2>Add New Prerequisites</h2>
        <div className="course-controls" style={{ marginBottom: "20px" }}>
          <input
            className="search-input"
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            }}
          />

          <select
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            }}
          >
            <option value="ALL">All Departments</option>
            <option value="CPSC">CPSC</option>
            <option value="MATH">MATH</option>
          </select>
        </div>

        {/* Available Courses Section */}
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
                <p style={{ margin: "5px 0" }}> <strong>Level:</strong> {course.Level}</p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Description:</strong> {course.Course_Description}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Credits:</strong> {course.Credits}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Department:</strong> {course.Department_Name}
                </p>
              </div>
              <button
                onClick={() => handleAddPrerequisite(course.CourseID)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  minWidth: "150px"
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
