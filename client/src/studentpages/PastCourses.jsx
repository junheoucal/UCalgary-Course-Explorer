// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from "../context/AuthProvider"; 

// const PastCourses = () => {
//     const { auth } = useAuth();
//     const [pastCourses, setPastCourses] = useState([]);

//     useEffect(() => {
//         const fetchAllPastCourses = async () => {
//             try { 
//                 const res = await axios.get("http://localhost:8800/studentpages/PastCourses", {
//                     params: { StudentID: auth.UCID },
//                 });
//                 console.log("Fetched past courses:", res.data); 
//                 console.log("Student ID:", auth.UCID);
//                 setPastCourses(res.data); 
//             } catch (err) {
//                 console.error("Error fetching past courses:", err.response ? err.response.data : err.message);
//             }
//         };
//         fetchAllPastCourses();
//     }, [auth.UCID]);

//     return (
//         <div>
//             <h1>Past Courses List</h1>
//             <div className="past-courses">
//                 {pastCourses.map((pastCourse) => (
//                     <div className="pastCourse" key={`${pastCourse.StudentID}-${pastCourse.CourseID}`}>
//                         <h2>{pastCourse.CourseID}</h2>
//                     </div>
//                 ))}
//             </div>
//             <button>
//                 <Link to="/studentpages/mycourses">Go Back To My Course</Link>
//             </button>
//         </div>
//     );
// };

// export default PastCourses;


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
                        <h2>{pastCourse.CourseID}</h2>
                        <h2>{pastCourse.Course_Name}</h2>
                        <h2>{pastCourse.Level}</h2>
                        <h2>{pastCourse.Course_Description}</h2>
                        <h2>{pastCourse.Credits}</h2>
                        <h2>{pastCourse.Department_Name}</h2>
                        <h2>{pastCourse.Concentration_Name}</h2>
                        <h2>{pastCourse.Prerequisite}</h2>
                        <h2>{pastCourse.Antirequisite}</h2>
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
