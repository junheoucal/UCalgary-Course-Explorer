import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../stylepages/CoursePage.css";

const CoursePage = () => {
  const { auth } = useAuth();
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);
  const [isTaken, setIsTaken] = useState(false);
  const [prerequisites, setPrerequisites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(
          `http://localhost:8800/course/${CourseID}`
        );
        setCourse(courseRes.data);

        // Fetch prerequisites
        const prereqRes = await axios.get(
          `http://localhost:8800/prerequisite/${CourseID}`
        );
        setPrerequisites(prereqRes.data);

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

        // Add new fetch for sections
        const sectionsRes = await axios.get(
          `http://localhost:8800/course/sections/${CourseID}`
        );
        setSections(sectionsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [CourseID, auth.UCID]);

  // Helper function to group sections by semester
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.Semester_Name]) {
      acc[section.Semester_Name] = { lectures: [], tutorials: [] };
    }
    if (section.type === 'Lecture') {
      acc[section.Semester_Name].lectures.push(section);
    } else {
      acc[section.Semester_Name].tutorials.push(section);
    }
    return acc;
  }, {});

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
          setError(
            "Cannot add course - You need to complete all prerequisites first"
          );
        } else {
          setError(response.data.error);
        }
        return;
      }

      navigate("/studentpages/home");
    } catch (err) {
      if (err.response?.data?.type === "PREREQUISITES_NOT_MET") {
        setError(
          "Cannot add course - You need to complete all prerequisites first"
        );
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

        {Object.entries(groupedSections).map(([semester, { lectures, tutorials }]) => (
          <div key={semester} className="semester-section">
            <h3>{semester}</h3>
            
            {lectures.length > 0 && (
              <div className="section-group">
                <h4>Lectures</h4>
                <ul>
                  {lectures.map((lecture) => (
                    <li key={`${lecture.type}-${lecture.SectionID}`}>
                      Section {lecture.SectionID}: {lecture.Days} {lecture.Start_time}-{lecture.End_time}
                      <br />
                      Location: {lecture.Building_Name} {lecture.Room_Location}
                      <br />
                      Enrollment: {lecture.Enrollment_Current_Number}/{lecture.Enrollment_Limit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tutorials.length > 0 && (
              <div className="section-group">
                <h4>Tutorials</h4>
                <ul>
                  {tutorials.map((tutorial) => (
                    <li key={`${tutorial.type}-${tutorial.SectionID}`}>
                      Tutorial {tutorial.SectionID}: {tutorial.Days} {tutorial.Start_time}-{tutorial.End_time}
                      <br />
                      Location: {tutorial.Building_Name} {tutorial.Room_Location}
                      <br />
                      Enrollment: {tutorial.Enrollment_Current_Number}/{tutorial.Enrollment_Limit}
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
          <button onClick={handleAdd} className="add-course-button">
            Add to My Courses
          </button>
        )}

        <button className="back-button">
          <Link to="/studentpages/CourseSearch">Back to Course Search</Link>
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
