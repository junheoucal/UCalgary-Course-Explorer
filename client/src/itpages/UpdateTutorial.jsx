import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateTutorial = () => {
  const location = useLocation();
  const CourseID = location.pathname.split("/")[3];
  const TutorialNo = location.pathname.split("/")[4];
  const semester_name = location.pathname.split("/")[5];
  const navigate = useNavigate();

  const [tutorial, setTutorials] = useState({
    TutorialNo: TutorialNo,
    CourseID: CourseID,
    semester_name: semester_name,
    TA_name: "",
    Enrollment_Limit: null,
    Enrollment_Current_Number: null,
    Building_Name: "",
    Room_Location: "",
    Days: "",
    Start_time: null,
    End_time: null,
  });

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/tutorial/${CourseID}/${TutorialNo}/${semester_name}`
        );
        const data = response.data;
        if (data && data.length > 0) {
          setTutorials({
            ...data[0],
            CourseID: CourseID,
            TutorialNo: TutorialNo,
            semester_name: semester_name,
          });
        }
      } catch (err) {
        console.log("Error fetching tutorial data:", err);
      }
    };

    fetchTutorialData();
  }, [CourseID, TutorialNo, semester_name]);

  const handleChange = (e) => {
    setTutorials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/tutorial/${CourseID}/${TutorialNo}/${semester_name}`,
        tutorial
      );
      navigate(`/itpages/tutorial/${CourseID}`);
    } catch (err) {
      console.log("Error updating tutorial:", err);
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
        <h1>Update Tutorial</h1>
        <input
          type="text"
          placeholder="Tutorial No"
          value={tutorial.TutorialNo}
          name="TutorialNo"
          disabled
        />
        <input
          type="text"
          placeholder="Semester Name"
          value={tutorial.semester_name}
          name="semester_name"
          disabled
        />
        <input
          type="text"
          placeholder="TA name"
          value={tutorial.TA_name}
          onChange={handleChange}
          name="TA_name"
        />
        <input
          type="number"
          placeholder="Enrollment Limit"
          value={tutorial.Enrollment_Limit}
          onChange={handleChange}
          name="Enrollment_Limit"
        />
        <input
          type="number"
          placeholder="Enrollment Current Number"
          value={tutorial.Enrollment_Current_Number}
          onChange={handleChange}
          name="Enrollment_Current_Number"
        />
        <input
          type="text"
          placeholder="Building Name"
          value={tutorial.Building_Name}
          onChange={handleChange}
          name="Building_Name"
        />
        <input
          type="text"
          placeholder="Room Location"
          value={tutorial.Room_Location}
          onChange={handleChange}
          name="Room_Location"
        />
        <input
          type="text"
          placeholder="Days"
          value={tutorial.Days}
          onChange={handleChange}
          name="Days"
        />
        <input
          type="time"
          placeholder="Start Time"
          value={tutorial.Start_time}
          onChange={handleChange}
          name="Start_time"
        />
        <input
          type="time"
          placeholder="End Time"
          value={tutorial.End_time}
          onChange={handleChange}
          name="End_time"
        />
        <button onClick={handleClick} className="formButton">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateTutorial;
