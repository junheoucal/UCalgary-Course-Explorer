import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../stylepages/AddCourse.css";

const Add = () => {
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

  const handleChange = (e) => {
    setCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/course", course);
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
        <h1> Add New Course</h1>
        <input
          type="text"
          placeholder="CourseID"
          onChange={handleChange}
          name="CourseID"
        />
        <input
          type="text"
          placeholder="Course_Name"
          onChange={handleChange}
          name="Course_Name"
        />
        <input
          type="number"
          placeholder="Level"
          onChange={handleChange}
          name="Level"
        />
        <input
          type="text"
          placeholder="Course_Description"
          onChange={handleChange}
          name="Course_Description"
        />
        <input
          type="number"
          placeholder="Credits"
          onChange={handleChange}
          name="Credits"
        />
        <input
          type="text"
          placeholder="Department_Name"
          onChange={handleChange}
          name="Department_Name"
        />
        <button className="formButton" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
