import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "../stylepages/Add.css";

const AddMinor = () => {
  const { auth } = useAuth();
  const [addMinor, setAddMinors] = useState({
    StudentID: auth.UCID,
    Minor: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddMinors((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axios.post(
        `http://localhost:8800/studentpages/addminor/${auth.UCID}`,
        addMinor
      );
      navigate("/studentpages/Minor");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("You are already enrolled in this minor");
      } else {
        setError("An error occurred while adding the minor");
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
        <button className="back-btn">
          <Link to="/studentpages/Minor">Back</Link>
        </button>
      </div>

      <div className="add-page">
        <h1>Add Minor</h1>
        <div className="add-form">
          <select name="Minor" onChange={handleChange}>
            <option value="">Select a Minor</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginTop: "10px" }}
            >
              {error}
            </div>
          )}
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

export default AddMinor;
