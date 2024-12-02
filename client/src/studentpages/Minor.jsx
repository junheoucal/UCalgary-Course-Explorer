import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider"; 

const Minor = () => {
    const { auth } = useAuth();
    const [degrees, setDegrees] = useState([]);
    const [requirements, setRequirements] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try { 
                // Fetch minors
                const minorRes = await axios.get("http://localhost:8800/studentpages/Minor", {
                    params: { StudentID: auth.UCID },
                });
                setDegrees(minorRes.data);

                // Fetch requirements for each minor
                const requirementsData = {};
                for (const degree of minorRes.data) {
                    const reqRes = await axios.get(
                        `http://localhost:8800/studentpages/MinorRequirements/${degree.Minor}/${auth.UCID}`
                    );
                    requirementsData[degree.Minor] = reqRes.data;
                }
                setRequirements(requirementsData);
            } catch (err) {
                console.error("Error fetching:", err.response ? err.response.data : err.message);
            }
        };
        fetchData();
    }, [auth.UCID]);

    const handleDelete = async (minor) => {
        try {
            await axios.delete(`http://localhost:8800/studentpages/Minor/${minor}/${auth.UCID}`);
            window.location.reload();
        } catch (err) {
            console.error("Error deleting minor:", err.response ? err.response.data : err.message);
        }
    };    

    const calculateProgress = (courses) => {
        if (!courses || courses.length === 0) return 0;
        const completed = courses.filter(course => course.is_completed).length;
        return Math.round((completed / courses.length) * 100);
    };

    return (
        <div className="major-container">
            <h1>Minor List</h1>
            <div className="degrees">
                {degrees.map((degree) => (
                    <div className="degree-card" key={`${degree.StudentID}-${degree.Minor}`}>
                        <div className="degree-header">
                            <h2>Minor: {degree.Minor}</h2>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(degree.Minor)}
                            >
                                Delete Minor
                            </button>
                        </div>

                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${calculateProgress(requirements[degree.Minor])}%` 
                                }}
                            />
                            <span className="progress-text">
                                {calculateProgress(requirements[degree.Minor])}% Complete
                            </span>
                        </div>

                        <div className="requirements-list">
                            <h3>Required Courses:</h3>
                            {requirements[degree.Minor]?.map((course) => (
                                <div 
                                    key={course.CourseID} 
                                    className={`requirement-item ${course.is_completed ? 'completed' : 'pending'}`}
                                >
                                    <Link to={`/studentpages/CoursePage/${course.CourseID}`}>
                                        <span className="course-id">{course.CourseID}</span>
                                        <span className="course-separator"> - </span>
                                        <span className="course-name">{course.Course_Name}</span>
                                    </Link>
                                    <span className="status-indicator">
                                        {course.is_completed ? '✓' : '○'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button>
                    <Link to="/studentpages/MyDegree">Go Back To My Degree</Link>
                </button>
                <button>
                    <Link to="/studentpages/addminor">Add Minor</Link>
                </button>
            </div>
        </div>
    );
};

export default Minor;
