import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CoursePage = () => {
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);

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
  }, []);

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
      <button>
        <Link to="/studentpages/CourseSearch">Back to Course Search</Link>
      </button>
    </div>
  );
};

export default CoursePage;
