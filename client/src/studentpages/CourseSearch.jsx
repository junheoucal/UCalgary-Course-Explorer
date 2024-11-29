import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseSearch = () => {
  const [courses, setCourse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    showtaken: true,
    showantirequisites: true,
    showtakable: false,
  });

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

  const filteredCourses = courses.filter(
    (course) =>
      course.CourseID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.Course_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Course Search</h1>
      <div className="course-search">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", margin: "10px 0", width: "200px" }}
        />
        <input type="checkbox" checked = {filters.showtaken}
          onChange={(e) => setFilters({...filters, showtaken: e.target.checked})}
        />
        Show Taken Courses
      </div>
      {filteredCourses.map((course) => (
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
