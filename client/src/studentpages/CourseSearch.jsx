import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CourseSearch = () => {
  const { auth } = useAuth();
  const [courses, setCourse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    showtaken: true,
    showantirequisites: true,
    showtakable: false,
    showonlyrequirements: false,
    department: 'ALL'
  });
  const [ucid, setUcid] = useState(auth.UCID);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/course", {
          params: {
            ...filters,
            ucid: ucid,
            searchTerm: searchTerm
          }
        });
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, [filters, ucid, searchTerm]);

  return (
    <div>
      <h1>Course Search</h1>
      <div className="course-search">
        <div className="search-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button>
          <Link to="/studentpages/coursemap">Open Map View</Link>
        </button>
        <div className="filters-container">
          <div className="filter-option">
            <input
              type="checkbox"
              checked={filters.showtaken}
              onChange={(e) =>
                setFilters({ ...filters, showtaken: e.target.checked })
              }
            />
            <label>Show Taken Courses</label>
          </div>

          <div className="filter-option">
            <input
              type="checkbox"
              checked={filters.showantirequisites}
              onChange={(e) =>
                setFilters({ ...filters, showantirequisites: e.target.checked })
              }
            />
            <label>Show Antirequisites</label>
          </div>

          <div className="filter-option">
            <input
              type="checkbox"
              checked={filters.showtakable}
              onChange={(e) => setFilters({ ...filters, showtakable: e.target.checked })}
            />
            <label>Show Takable Courses</label>
          </div>

          <div className="filter-option">
            <input
              type="checkbox"
              checked={filters.showonlyrequirements}
              onChange={(e) => setFilters({ ...filters, showonlyrequirements: e.target.checked})}
            />
            <label>Show Only Requirements</label>
          </div>

          <div className="department-select">
            <select 
              name="department" 
              id="department"
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="ALL">All Departments</option>
              <option value="CPSC">CPSC</option>
              <option value="MATH">MATH</option>
            </select>
            <label>Select Department</label>
          </div>
        </div>
      </div>

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
        <Link to="/studentpages/home">Back</Link>
      </button>
    </div>
  );
};

export default CourseSearch;
