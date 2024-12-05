import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCurrent = () => {
  const [course, setCourse] = useState({
    CourseID: "",
    Course_Name: "",
    Level: null,
    Course_Description: "",
    Credits: null,
    Department_Name: "",
    Concentration_Name: "",
  });

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <h1>Add Current Course</h1>
    </div>
  );
};

export default AddCurrent;
