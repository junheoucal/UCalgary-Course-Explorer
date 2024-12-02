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
    department: "ALL",
  });
  const [ucid, setUcid] = useState(auth.UCID);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/course", {
          params: {
            ...filters,
            ucid: ucid,
          },
        });
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, [filters, ucid]);

  const filteredCourses = Array.isArray(courses)
    ? courses.filter(
        (course) =>
          course.CourseID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.Course_Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
        <div>
          <input
            type="checkbox"
            checked={filters.showtaken}
            onChange={(e) =>
              setFilters({ ...filters, showtaken: e.target.checked })
            }
          />
          Show Taken Courses
        </div>
        <div>
          <input
            type="checkbox"
            checked={filters.showantirequisites}
            onChange={(e) =>
              setFilters({ ...filters, showantirequisites: e.target.checked })
            }
          />
          Show Antirequisites
        </div>
        <div>
          <input
            type="checkbox"
            checked={filters.showtakable}
            onChange={(e) =>
              setFilters({ ...filters, showtakable: e.target.checked })
            }
          />
          Show Takable Courses
        </div>
        <div>
          <input
            type="checkbox"
            checked={filters.showonlyrequirements}
            onChange={(e) =>
              setFilters({ ...filters, showonlyrequirements: e.target.checked })
            }
          />
          Show Only Requirements
        </div>
        <div>
          <select
            name="department"
            id="department"
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
            <option value="ALL">All Departments</option>
            <option value="CPSC">CPSC</option>
            <option value="MATH">MATH</option>
          </select>
          Select Department
        </div>
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
        <Link to="/studentpages/home">Back</Link>
      </button>
    </div>
  );
};
export default CourseSearch;
