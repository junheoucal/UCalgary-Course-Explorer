import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseSearch = () => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/course");
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div>
      <h1>Course Search</h1>
      <div className="course-search"></div>
      {courses.map((course) => (
        <div className="course" key={course.CourseID}>
          <h3>
            <Link to={`/studentpages/CoursePage/${course.CourseID}`}>
              {course.CourseID}
            </Link>
          </h3>
          <h3>{course.Course_Name}</h3>
        </div>
      ))}
      <button>
        <Link to="/studentpages/StudentHome">Back</Link>
      </button>
    </div>
  );
};
export default CourseSearch;