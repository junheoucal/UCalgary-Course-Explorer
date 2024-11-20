import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LOGIN_URL = '/itlogin';
function Login() {
  const { login } = useAuth();
  const [UCID, setUCID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!UCID || !password) {
      setError('Please fill in all fields');
      return;
    }

    axios.post("http://localhost:8800/itlogin", {UCID, password})
      .then((res) => {
        if (res.data.success) {
          login(res.data.userID, 'it');
          window.location.href = './course';
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError('An error occurred during login');
      });
  }

  return (
    <div>
      <div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="UCID">UCID</label>
            <input 
              type="text" 
              placeholder='Enter UCID' 
              value={UCID}
              onChange={(e) => setUCID(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder='Enter Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login