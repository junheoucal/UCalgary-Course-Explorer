import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEnrollment = () => {
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
    <div>
      <h1>Add Current Course</h1>
    </div>
  );
};

export default AddEnrollment;