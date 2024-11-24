import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './itpages/Login';
import StudentLogin from './studentpages/Login';
import StudentRegister from './studentpages/Register';
import Register from './itpages/Register';
import Course from './itpages/Course';
import AuthGuard from './components/AuthGuard';
import AddCourse from './itpages/AddCourse';
import UpdateCourse from './itpages/UpdateCourse';
import Lecture from './itpages/Lecture';
import AddLecture from './itpages/AddLecture';
import UpdateLecture from './itpages/UpdateLecture';
import StudentHome from './studentpages/StudentHome';
import CurrentEnrollment from './studentpages/CurrentEnrollment';
import AddEnrollment from './studentpages/AddEnrollment';
import PastCourses from './studentpages/PastCourses';
import MyDegree from './studentpages/MyDegree';
import CourseSearch from './studentpages/CourseSearch';
import MyCourses from './studentpages/MyCourses';
import Home from './Home';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itpages/login" element={<Login />} />
            <Route path="/studentpages/login" element={<StudentLogin />} />
            <Route path="/itpages/register" element={<Register />} />
            <Route path="/studentpages/register" element={<StudentRegister />} />
            <Route path="/studentpages/mycourses" element={<MyCourses />} />
            <Route path="/studentpages/studenthome" element={<StudentHome />} />
            <Route path="/studentpages/currentenrollment" element={<CurrentEnrollment />} />
            <Route path="/studentpages/addenrollment" element={<AddEnrollment />} />
            <Route path="/studentpages/pastcourses" element={<PastCourses />} />
            <Route path="/studentpages/mydegree" element={<MyDegree />} />
            <Route path="/studentpages/courseseach" element={<CourseSearch />} />
            <Route path="/itpages/course" element={
              <AuthGuard>
                <Course />
              </AuthGuard>
            } />
            <Route path="/" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
