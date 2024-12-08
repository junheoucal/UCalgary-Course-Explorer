import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../stylepages/Tutorial.css";

const Tutorial = () => {
  const { CourseID } = useParams();
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const fetchAllTutorial = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/tutorial/${CourseID}`
        );
        setTutorials(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllTutorial();
  }, [CourseID]);

  const handleDeleteTutorial = async (TutorialNo, semester_name) => {
    try {
      await axios.delete(
        `http://localhost:8800/tutorial/${CourseID}/${TutorialNo}/${semester_name}`
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    console.log(CourseID),
    (
      <div className="ucalgary-container">
        <div className="header">
          <img
            src="/uofc-logo.png"
            alt="University of Calgary Logo"
            className="ucalgary-logo"
          />
        </div>

        <h1>Tutorial List</h1>
        <div className="tutorial-container">
          {tutorials.map((tutorial) => (
            <div
              className="tutorial"
              key={`${tutorial.TutorialNo}-${tutorial.semester_name}`}
            >
              <h2>{tutorial.TutorialNo}</h2>
              <p>Course ID: {tutorial.CourseID}</p>
              <p>Semester Name: {tutorial.semester_name}</p>
              {/* <p>{tutorial.TA_name}</p> */}
              <p>Enrollment Limit: {tutorial.Enrollment_Limit}</p>
              <p>
                Current Number of Enrollments:
                {tutorial.Enrollment_Current_Number}
              </p>
              <p>Building Name: {tutorial.Building_Name}</p>
              <p>Room Location: {tutorial.Room_Location}</p>
              <p>Number of Days: {tutorial.Days}</p>
              <p>Start Time: {tutorial.Start_time}</p>
              <p>End Time: {tutorial.End_time}</p>
              <button
                className="delete"
                onClick={() =>
                  handleDeleteTutorial(
                    tutorial.TutorialNo,
                    tutorial.semester_name
                  )
                }
              >
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/itpages/UpdateTutorial/${CourseID}/${tutorial.TutorialNo}/${tutorial.semester_name}`}
                >
                  Update
                </Link>
              </button>
            </div>
          ))}
        </div>
        <button>
          <Link to={`/itpages/AddTutorial/${CourseID}`}>Add new Tutorial</Link>
        </button>
        <button>
          <Link to="/itpages/Course">Go Back To Course List</Link>
        </button>
      </div>
    )
  );
};

export default Tutorial;
