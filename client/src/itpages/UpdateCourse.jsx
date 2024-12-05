import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="form">
      <h1> Update New Course</h1>
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
      <input
        type="text"
        placeholder="Concentration_Name"
        onChange={handleChange}
        name="Concentration_Name"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
