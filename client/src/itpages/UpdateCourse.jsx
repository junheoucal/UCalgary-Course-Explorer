import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Update = () => {
  const [course, setCourse] = useState({
    CourseID: "",
    Course_Name: "",
    Level: null,
    Course_Description: "",
    Credits: null,
    Department_Name: "",
    Concentration_Name: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const courseID = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/course/${courseID}`
        );
        const data = response.data;
        if (data && data.length > 0) {
          setCourse(data[0]);
        }
      } catch (err) {
        console.log("Error fetching course data:", err);
      }
    };

    fetchCourseData();
  }, [courseID]);

  const handleChange = (e) => {
    setCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/course/" + courseID, course);
      navigate("/itpages/Course");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(course);
  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
        <button className="back-btn">
          <Link to="/itpages/course">Back</Link>
        </button>
      </div>

      <div className="form">
        <h1>Update Course</h1>
        <input
          type="text"
          placeholder="CourseID"
          value={course.CourseID}
          onChange={handleChange}
          name="CourseID"
          disabled
        />
        <input
          type="text"
          placeholder="Course_Name"
          value={course.Course_Name}
          onChange={handleChange}
          name="Course_Name"
        />
        <input
          type="number"
          placeholder="Level"
          value={course.Level}
          onChange={handleChange}
          name="Level"
        />
        <input
          type="text"
          placeholder="Course_Description"
          value={course.Course_Description}
          onChange={handleChange}
          name="Course_Description"
        />
        <input
          type="number"
          placeholder="Credits"
          value={course.Credits}
          onChange={handleChange}
          name="Credits"
        />
        <input
          type="text"
          placeholder="Department_Name"
          value={course.Department_Name}
          onChange={handleChange}
          name="Department_Name"
        />
        <button className="formButton" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Update;
