import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
      </div>
      <div className="form">
        <h1>Add Lecture</h1>
        <input
          type="text"
          placeholder="lecture ID"
          onChange={handleChange}
          name="LectureID"
        />
        <input
          type="number"
          placeholder="enrollment limit"
          onChange={handleChange}
          name="Enrollment_Limit"
        />
        <input
          type="number"
          placeholder="enrollment current number"
          onChange={handleChange}
          name="Enrollment_Current_Number"
        />
        <input
          type="text"
          placeholder="building name"
          onChange={handleChange}
          name="Building_Name"
        />
        <input
          type="text"
          placeholder="room location"
          onChange={handleChange}
          name="Room_Location"
        />
        <input
          type="text"
          placeholder="semester name"
          onChange={handleChange}
          name="Semester_Name"
        />
        <input
          type="text"
          placeholder="days"
          onChange={handleChange}
          name="Days"
        />
        <input
          type="time"
          placeholder="start time"
          onChange={handleChange}
          name="Start_time"
        />
        <input
          type="time"
          placeholder="end time"
          onChange={handleChange}
          name="End_time"
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddLecture;
