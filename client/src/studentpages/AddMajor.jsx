import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../stylepages/Add.css";

const AddMajor = () => {
  const { auth } = useAuth();
  const [addMajor, setAddMajors] = useState({
    StudentID: auth.UCID,
    Major: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddMajors((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axios.post(
        `http://localhost:8800/studentpages/addmajor/${auth.UCID}`,
        addMajor
      );
      navigate("/studentpages/Major");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("You are already enrolled in this major");
      } else {
        setError("An error occurred while adding the major");
      }
      console.log(err);
    }
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <div className="add-page">
        <h1>Add Major</h1>
        <div className="add-form">
          <select name="Major" onChange={handleChange}>
            <option value="">Select a Major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          {error && <div className="error-message" style={{color: 'red', marginTop: '10px'}}>{error}</div>}
          <div className="button-group">
            <button onClick={handleClick} className="add-button">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMajor;
