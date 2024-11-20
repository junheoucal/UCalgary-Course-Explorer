import React, { useState, useContext } from 'react'
import axios from 'axios';
import AuthContext from '../context/AuthProvider';

const LOGIN_URL = '/studentlogin';
function Login() {
  const {setAuth} = useContext(AuthContext);
  const [UCID, setUCID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Check if fields are not empty
    if (!UCID || !password) {
      setError('Please fill in all fields');
      return;
    }

    axios.post("http://localhost:8800/studentlogin", {UCID, password})
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('userID', res.data.userID);
          localStorage.setItem('userType', 'student');
          window.location.href = './StudentHome';
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred during login');
        console.log(err);
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