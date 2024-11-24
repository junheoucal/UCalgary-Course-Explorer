import React from 'react'
import {Link} from 'react-router-dom';


function Home() {
  return (
    <div>
        <h1 className="home-title">Course Search Engine</h1>
        <div className="login-buttons">
            <button><Link to="/studentpages/Login">Login as Student</Link></button>
            <button><Link to="/studentpages/Register">Register as Student</Link></button>
            <button><Link to="/itpages/Login">Login as IT</Link></button>
            <button><Link to="/itpages/Register">Register as IT</Link></button>
        </div>
    </div>
  )
}

export default Home