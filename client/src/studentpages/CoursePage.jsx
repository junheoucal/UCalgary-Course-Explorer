import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const CoursePage = () => {
  const { auth } = useAuth();
  const { CourseID } = useParams();
  const [courses, setCourse] = useState([]);
  const [isTaken, setIsTaken] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseRes = await axios.get(`http://localhost:8800/course/${CourseID}`);
        setCourse(courseRes.data);

        // Fetch lectures
        const lectureRes = await axios.get(`http://localhost:8800/lecture/${CourseID}`);
        setLectures(lectureRes.data);

        // Fetch tutorials
        const tutorialRes = await axios.get(`http://localhost:8800/tutorial/${CourseID}`);
        setTutorials(tutorialRes.data);

        // Check if student has taken this course
        const takenRes = await axios.get(`http://localhost:8800/course`, {
          params: { ucid: auth.UCID }
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

  // Group lectures and tutorials by semester
  const getSemesterGroups = () => {
    const semesters = new Set([
      ...lectures.map(l => l.Semester_Name),
      ...tutorials.map(t => t.semester_name)
    ]);

    return Array.from(semesters).sort().map(semester => ({
      semester,
      lectures: lectures.filter(l => l.Semester_Name === semester),
      tutorials: tutorials.filter(t => t.semester_name === semester)
    }));
  };

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
        </div>
      ))}
      
      {getSemesterGroups().map(({ semester, lectures, tutorials }) => (
        <div key={semester} className="semester-group">
          <h2>Semester: {semester}</h2>
          
          {lectures.length > 0 && (
            <div className="lectures">
              <h3>Lectures</h3>
              {lectures.map(lecture => (
                <div key={lecture.LectureID} className="lecture-item">
                  <p>Lecture {lecture.LectureID}</p>
                  <p>Days: {lecture.Days}</p>
                  <p>Time: {lecture.Start_time} - {lecture.End_time}</p>
                  <p>Location: {lecture.Building_Name} {lecture.Room_Location}</p>
                  <p>Enrollment: {lecture.Enrollment_Current_Number}/{lecture.Enrollment_Limit}</p>
                </div>
              ))}
            </div>
          )}
          
          {tutorials.length > 0 && (
            <div className="tutorials">
              <h3>Tutorials</h3>
              {tutorials.map(tutorial => (
                <div key={tutorial.TutorialNo} className="tutorial-item">
                  <p>Tutorial {tutorial.TutorialNo}</p>
                  <p>TA: {tutorial.TA_name}</p>
                  <p>Days: {tutorial.Days}</p>
                  <p>Time: {tutorial.Start_time} - {tutorial.End_time}</p>
                  <p>Location: {tutorial.Building_Name} {tutorial.Room_Location}</p>
                  <p>Enrollment: {tutorial.Enrollment_Current_Number}/{tutorial.Enrollment_Limit}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
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
