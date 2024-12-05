import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CoursePage = () => {
  const { auth } = useAuth();
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);
  const [isTaken, setIsTaken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(
          `http://localhost:8800/course/${CourseID}`
        );
        setCourse(courseRes.data);

        // Check if student has taken this course
        const takenRes = await axios.get(`http://localhost:8800/course`, {
          params: {
            ucid: auth.UCID,
          },
        });
        const isTakenCourse = takenRes.data.some(
          (course) => course.CourseID === CourseID && course.is_taken
        );
        setIsTaken(isTakenCourse);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [CourseID, auth.UCID]);

  const handleAdd = async () => {
    try {
      console.log("Attempting to add course with UCID:", auth.UCID);
      const response = await axios.post(
        `http://localhost:8800/take_course/${CourseID}`,
        {
          UCID: auth.UCID,
        }
      );
      console.log("Server response:", response.data);

      if (response.data.error) {
        console.error("Error adding course:", response.data.error);
        return;
      }

      navigate("/studentpages/home");
    } catch (err) {
      console.error("Error adding course:", err.response?.data || err.message);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/take_course/${CourseID}/${auth.UCID}`
      );

      if (response.data.error) {
        console.error("Error removing course:", response.data.error);
        return;
      }

      navigate("/studentpages/home");
    } catch (err) {
      console.error(
        "Error removing course:",
        err.response?.data || err.message
      );
    }
  };

  if (!courses.length) return <div>Loading...</div>;

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>
      <div className="course-info">
        {courses.map((course) => (
          <div key={course.CourseID}>
            <h1>{course.CourseID}</h1>
            <h3>{course.Course_Name}</h3>
            <p>Level: {course.Level}</p>
            <p>{course.Course_Description}</p>
            <p>Credits: {course.Credits}</p>
            <p>{course.Department_Name} Department</p>
          </div>
        ))}
      </div>

      {isTaken ? (
        <button onClick={handleRemove} className="remove-button">
          Remove from My Courses
        </button>
      ) : (
        <button onClick={handleAdd}>Add to My Courses</button>
      )}

      <button>
        <Link to="/studentpages/CourseSearch">Back to Course Search</Link>
      </button>
    </div>
  );
};

export default CoursePage;
