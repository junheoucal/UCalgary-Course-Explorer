import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/course">Courses</Link></li>
        <li><Link to="/lectures">Lectures</Link></li>
        {/* Add more navigation links */}
        <li><Logout /></li>
      </ul>
    </nav>
  );
}

export default Navigation; 