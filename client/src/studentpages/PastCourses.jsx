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
                        <h3>Name: {pastCourse.Course_Name}</h3>
                        <h4>Level: {pastCourse.Level}</h4>
                        <h4>Description: {pastCourse.Course_Description}</h4>
                        <h4>Credits: {pastCourse.Credits}</h4>
                        <h4>Department: {pastCourse.Department_Name}</h4>
                        <h4>Concentration: {pastCourse.Concentration_Name}</h4>
                        <h4>Prerequisite to: {pastCourse.Prerequisite}</h4>
                        <h4>Antirequisite of: {pastCourse.Antirequisite}</h4>
                        <h4>Major requirement: {pastCourse.Major}</h4>
                        <h4>Minor requirement: {pastCourse.Minor}</h4>
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
