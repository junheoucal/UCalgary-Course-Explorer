import React, { useEffect, useState } from "react"; // Import useState
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import "../stylepages/Lecture.css";
const Lecture = () => {
  const location = useLocation();
  const CourseID = location.pathname.split("/")[3];
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchAllLecture = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/lecture/${CourseID}`
        );
        setLectures(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllLecture();
  }, []);

  const handleDeleteLecture = async (LectureID) => {
    try {
      console.log("Deleting lecture with ID:", LectureID);
      await axios.delete(
        `http://localhost:8800/lecture/${CourseID}/${LectureID}`
      );
      window.location.reload();
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

      <h1> Lecture List </h1>
      <div className="lecture-container">
        {lectures.map((lecture) => (
          <div className="lecture" key={lecture.LectureID}>
            <h2>{lecture.LectureID}</h2>
            <p>Enrollment Limit: {lecture.Enrollment_Limit}</p>
            <p>
              Current Number of Enrollments: {lecture.Enrollment_Current_Number}
            </p>
            <p>Building Name: {lecture.Building_Name}</p>
            <p>Room Location: {lecture.Room_Location}</p>
            <p>Semester Name: {lecture.Semester_Name}</p>
            <p>Days: {lecture.Days}</p>
            <p>Start Time: {lecture.Start_time}</p>
            <p>End Time: {lecture.End_time}</p>
            <button
              className="delete"
              onClick={() => handleDeleteLecture(lecture.LectureID)}
            >
              Delete
            </button>
            <button className="update">
              <Link
                to={`/itpages/UpdateLecture/${CourseID}/${lecture.LectureID}`}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={`/itpages/AddLecture/${CourseID}`}>Add New Lecture</Link>
      </button>
      <button>
        <Link to={`/itpages/course`}>Back To Course List</Link>
      </button>
    </div>
  );
};

export default Lecture;
