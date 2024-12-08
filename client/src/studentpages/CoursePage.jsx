import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CoursePage = () => {
  const { auth } = useAuth();
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);
  const [isTaken, setIsTaken] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(`http://localhost:8800/course/${CourseID}`);
        setCourse(courseRes.data);

        // Fetch prerequisites
        const prereqRes = await axios.get(`http://localhost:8800/prerequisite/${CourseID}`);
        setPrerequisites(prereqRes.data);

        // Check if student has taken this course
        const takenRes = await axios.get(`http://localhost:8800/course`, {
          params: {
            ucid: auth.UCID,
          }
        });
        const isTakenCourse = takenRes.data.some(
          course => course.CourseID === CourseID && course.is_taken
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
      setError(null);
      const response = await axios.post(
        `http://localhost:8800/take_course/${CourseID}`,
        {
          UCID: auth.UCID,
        }
      );

      if (response.data.error) {
        if (response.data.type === "PREREQUISITES_NOT_MET") {
          setError("Cannot add course - You need to complete all prerequisites first");
        } else {
          setError(response.data.error);
        }
        return;
      }

      navigate("/studentpages/home");
    } catch (err) {
      if (err.response?.data?.type === "PREREQUISITES_NOT_MET") {
        setError("Cannot add course - You need to complete all prerequisites first");
      } else {
        setError(err.response?.data?.error || "An error occurred");
      }
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
      console.error("Error removing course:", err.response?.data || err.message);
    }
  };

  if (!courses.length) return <div>Loading...</div>;

  return (
    <div className="course-info">
      {courses.map((course) => (
        <div key={course.CourseID}>
          <h1>{course.CourseID}</h1>
          <h3>{course.Course_Name}</h3>
          <p>Level: {course.Level}</p>
          <p>{course.Course_Description}</p>
          <p>Credits: {course.Credits}</p>
          <p>{course.Department_Name} Department</p>
          
          {prerequisites.length > 0 && (
            <div className="prerequisites">
              <h4>Prerequisites:</h4>
              <ul>
                {prerequisites.map((prereq) => (
                  <li key={prereq.Required_CourseID}>
                    {prereq.Required_CourseID} - {prereq.Course_Name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      
      {error && <div className="error-message">{error}</div>}
      
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
