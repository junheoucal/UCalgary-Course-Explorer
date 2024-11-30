import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CoursePage = () => {
  const { auth } = useAuth();
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/course/${CourseID}`);
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, [CourseID]);

  const handleClick = async () => {
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
        </div>
      ))}
      <button onClick={handleClick}>Add to My Courses</button>
      <button>
        <Link to="/studentpages/CourseSearch">Back to Course Search</Link>
      </button>
    </div>
  );
};

export default CoursePage;
