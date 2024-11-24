import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateLecture = () => {
    const location = useLocation();
    const CourseID = location.pathname.split("/")[3];
    console.log("Course ID:", CourseID);
    const navigate = useNavigate();

    const [lecture, setLectures] = useState({
        LectureID: "",
        CourseID: CourseID,
        Enrollment_Limit: null,
        Enrollment_Current_Number: null,
        Building_Name: "",
        Room_Location: "",
        Semester_Name: "",
        Days: "",
        Start_time: null,
        End_time: null
    });

    useEffect(() => {
        const fetchLectureData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/lecture/${CourseID}`);
                const data = response.data;
                if (data && data.length > 0) {
                    setLectures({
                        ...data[0],  // Pre-fill the lecture details
                        CourseID: CourseID  // Ensure the CourseID is set
                    });
                }
            } catch (err) {
                console.log("Error fetching lecture data:", err);
            }
        };

        fetchLectureData();
    }, [CourseID]);

    const handleChange = (e) => {
        setLectures(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // PUT the lecture data to the server
            await axios.put(`http://localhost:8800/lecture/${CourseID}`, lecture);
            navigate(`/itpages/lecture/${CourseID}`); // Navigate to the updated lecture page
        } catch (err) {
            console.log("Error updating lecture:", err);
        }
    };

    return (
        <div className='form'>
            <h1>Update Lecture</h1>
            <input type="text" placeholder="lecture ID" value={lecture.LectureID} name="LectureID" disabled />
            <input type="number" placeholder="enrollment limit" value={lecture.Enrollment_Limit} onChange={handleChange} name="Enrollment_Limit" />
            <input type="number" placeholder="enrollment current number" value={lecture.Enrollment_Current_Number} onChange={handleChange} name="Enrollment_Current_Number" />
            <input type="text" placeholder="building name" value={lecture.Building_Name} onChange={handleChange} name="Building_Name" />
            <input type="text" placeholder="room location" value={lecture.Room_Location} onChange={handleChange} name="Room_Location" />
            <input type="text" placeholder="semester name" value={lecture.Semester_Name} onChange={handleChange} name="Semester_Name" />
            <input type="text" placeholder="days" value={lecture.Days} onChange={handleChange} name="Days" />
            <input type="time" placeholder="start time" value={lecture.Start_time} onChange={handleChange} name="Start_time" />
            <input type="time" placeholder="end time" value={lecture.End_time} onChange={handleChange} name="End_time" />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateLecture;