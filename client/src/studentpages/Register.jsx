import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [UCID, setUCID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!UCID || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post("http://localhost:8800/studentregister", { UCID, password })
      .then((res) => {
        console.log('Registration response:', res.data);
        if (res.data.success) {
          setSuccess('Registration successful! You can now login.');
          // Clear form
          setUCID('');
          setPassword('');
          setConfirmPassword('');
          // Redirect to login page after delay
          setTimeout(() => {
            window.location.href = './login';
          }, 2000);
        } else {
          setError(res.data.message || 'Registration failed');
        }
      })
      .catch((err) => {
        console.error('Registration error:', err);
        setError('An error occurred during registration');
      });
  };

  return (
    <div className="register-container">
      <h2>Student Registration</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="UCID">UCID:</label>
          <input
            type="text"
            id="UCID"
            value={UCID}
            onChange={(e) => setUCID(e.target.value)}
            placeholder="Enter your UCID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="login-link">
        Already have an account? <a href="./login">Login here</a>
      </div>
    </div>
  );
}

export default Register;