import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider"; 

const PastCourses = () => {
    const { auth } = useAuth();
    const [pastCourses, setPastCourses] = useState([]);

    useEffect(() => {
        const fetchAllPastCourses = async () => {
            try { 
                const res = await axios.get("http://localhost:8800/studentpages/PastCourses", {
                    params: { StudentID: auth.UCID },
                });
                console.log("Fetched past courses:", res.data); 
                console.log("Student ID:", auth.UCID);
                setPastCourses(res.data); 
            } catch (err) {
                console.error("Error fetching past courses:", err.response ? err.response.data : err.message);
            }
        };
        fetchAllPastCourses();
    }, [auth.UCID]);

    return (
        <div>
            <h1>Past Courses List</h1>
            <div className="past-courses">
                {pastCourses.map((pastCourse) => (
                    <div className="pastCourse" key={`${pastCourse.StudentID}-${pastCourse.CourseID}`}>
                        <h2>Course: {pastCourse.CourseID}</h2>
                        <h2>Name: {pastCourse.Course_Name}</h2>
                        <h2>Level: {pastCourse.Level}</h2>
                        <h2>Description: {pastCourse.Course_Description}</h2>
                        <h2>Credits: {pastCourse.Credits}</h2>
                        <h2>Department: {pastCourse.Department_Name}</h2>
                        <h2>Concentration: {pastCourse.Concentration_Name}</h2>
                        <h2>Prerequisite to: {pastCourse.Prerequisite}</h2>
                        <h2>Antirequisite of: {pastCourse.Antirequisite}</h2>
                        <h2>Major requirement: {pastCourse.Major}</h2>
                        <h2>Minor requirement: {pastCourse.Minor}</h2>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/studentpages/mycourses">Go Back To My Course</Link>
            </button>
        </div>
    );
};

export default PastCourses;
