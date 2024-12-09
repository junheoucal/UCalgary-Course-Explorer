import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AddLecture = () => {
  const location = useLocation();
  const CourseID = location.pathname.split("/")[3];
  // console.log("Course ID:", CourseID);
  const [lecture, setLectures] = useState({
    LectureID: "",
    CourseID: CourseID,
    Enrollment_Limit: null,
    Enrollment_Current_Number: null,
    Building_Name: "",
    Room_Location: "",
    Semester_Name: "",
    Days: "",
    Start_time: null,
    End_time: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLectures((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Post the lecture data to the server
      await axios.post(`http://localhost:8800/lecture/${CourseID}`, lecture);

      // After adding, navigate to the lecture page of that course
      navigate(`/itpages/lecture/${CourseID}`); // Redirect to the lecture page for this course
    } catch (err) {
      console.log(err);
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
          <Link to={`/itpages/lecture/${CourseID}`}>Back</Link>
        </button>
      </div>

      <div className="form">
        <h1>Add Lecture</h1>
        <input
          type="text"
          placeholder="Lecture ID"
          onChange={handleChange}
          name="LectureID"
        />
        <input
          type="number"
          placeholder="Enrollment Limit"
          onChange={handleChange}
          name="Enrollment_Limit"
        />
        <input
          type="number"
          placeholder="Enrollment Current Number"
          onChange={handleChange}
          name="Enrollment_Current_Number"
        />
        <input
          type="text"
          placeholder="Building Name"
          onChange={handleChange}
          name="Building_Name"
        />
        <input
          type="text"
          placeholder="Room Location"
          onChange={handleChange}
          name="Room_Location"
        />
        <input
          type="text"
          placeholder="Semester Name"
          onChange={handleChange}
          name="Semester_Name"
        />
        <input
          type="text"
          placeholder="Days"
          onChange={handleChange}
          name="Days"
        />
        <input
          type="time"
          placeholder="Start Time"
          onChange={handleChange}
          name="Start_time"
        />
        <input
          type="time"
          placeholder="End Time"
          onChange={handleChange}
          name="End_time"
        />
        <button onClick={handleClick} className="formButton">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddLecture;
