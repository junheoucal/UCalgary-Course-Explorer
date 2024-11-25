import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider"; 

const MyDegree = () => {
    const { auth } = useAuth();
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        const fetchAllDegrees = async () => {
            try { 
                const res = await axios.get("http://localhost:8800/studentpages/MyDegree", {
                    params: { StudentID: auth.UCID },
                });
                setDegrees(res.data); 
            } catch (err) {
                console.error("Error fetching past courses:", err.response ? err.response.data : err.message);
            }
        };
        fetchAllDegrees();
    }, [auth.UCID]);

    return (
        <div>
            <h1>Major and Minor List</h1>
            <div className="degrees">
                {degrees.map((degree) => (
                    <div className="degree" key={`${degree.StudentID}-${degree.Major}-${degree.Minor}`}>
                        <h2>Major: {degree.Major}</h2>
                        <h2>Minor: {degree.Minor}</h2>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/studentpages/home">Go Back To Student Home Page</Link>
            </button>
        </div>
    );
};

export default MyDegree;
