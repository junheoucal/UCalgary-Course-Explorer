import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider"; 

const Minor = () => {
    const { auth } = useAuth();
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        const fetchAllDegrees = async () => {
            try { 
                const res = await axios.get("http://localhost:8800/studentpages/Minor", {
                    params: { StudentID: auth.UCID },
                });
                setDegrees(res.data); 
            } catch (err) {
                console.error("Error fetching:", err.response ? err.response.data : err.message);
            }
        };
        fetchAllDegrees();
    }, [auth.UCID]);

    const handleDelete = async (minor) => {
        try {
            await axios.delete(`http://localhost:8800/studentpages/Minor/${minor}/${auth.UCID}`);
            window.location.reload();
        } catch (err) {
            console.error("Error deleting minor:", err.response ? err.response.data : err.message);
        }
    };    

    return (
        <div>
            <h1>Minor List</h1>
            <div className="degrees">
                {degrees.map((degree) => (
                    <div className="degree" key={`${degree.StudentID}-${degree.Minor}`}>
                        <h2>Minor: {degree.Minor}</h2>
                        <button
                            className="delete"
                            onClick={() => handleDelete(degree.Minor)}
                         >
                            Delete Major
                        </button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/studentpages/MyDegree">Go Back To My Degree</Link>
            </button>
            <button>
                <Link to="/studentpages/addminor">Add Minor</Link>
            </button>
        </div>
    );
};

export default Minor;
