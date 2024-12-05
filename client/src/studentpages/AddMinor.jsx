import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AddMinor = () => {
  const { auth } = useAuth();
  const [addMinor, setAddMinors] = useState({
    StudentID: auth.UCID,
    Major: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddMinors((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/studentpages/addminor/${auth.UCID}`,
        addMinor
      );
      navigate("/studentpages/Minor");
    } catch (err) {
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

      <div className="form">
        <h1>Add Minor</h1>
        <select name="Minor" onChange={handleChange}>
          <option value="">Select a Minor</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
        </select>
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddMinor;
