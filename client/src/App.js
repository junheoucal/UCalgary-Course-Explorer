import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ITLogin from './itpages/Login';
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
import Minor from './studentpages/Minor';
import Major from './studentpages/Major';
import PastCourses from './studentpages/PastCourses';
import MyDegree from './studentpages/MyDegree';
import CourseSearch from './studentpages/CourseSearch';
import MyCourses from './studentpages/MyCourses';
import CoursePage from './studentpages/CoursePage';
import Home from './Home';
import AddMajor from './studentpages/AddMajor';
import AddMinor from './studentpages/AddMinor';
import Tutorial from './itpages/Tutorial';
import UpdateTutorial from './itpages/UpdateTutorial';
import AddTutorial from './itpages/AddTutorial';
import "./style.css";


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/itpages/login" element={<ITLogin />} />
            <Route path="/itpages/register" element={<Register />} />
            <Route
              path="/itpages/*"
              element={
                <AuthGuard userType="it">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="course" element={<Course />} />
                    <Route path="lecture/*" element={<Lecture />} />
                    <Route path="addcourse" element={<AddCourse />} />
                    <Route path="updatecourse/*" element={<UpdateCourse />} />
                    <Route path="addlecture" element={<AddLecture />} />
                    <Route path="updatelcture/*" element={<UpdateLecture />} />
                    <Route path="addtutorial/*" element={<AddTutorial />} />
                    <Route path="tutorial/:CourseID" element={<Tutorial />} />
                    <Route
                      path="updatetutorial/*"
                      element={<UpdateTutorial />}
                    />
                  </Routes>
                </AuthGuard>
              }
            />
            <Route path="/studentpages/login" element={<StudentLogin />} />
            <Route path="/studentpages/register" element={<StudentRegister />} />
            <Route path="/studentpages/*" element={
              <AuthGuard userType="student">
                <Routes>
                  <Route path="home" element={<StudentHome />} />
                  <Route path="courses" element={<CoursePage />} />
                  <Route path="mycourses" element={<MyCourses />} />
                  <Route path="minor" element={<Minor />} />
                  <Route path="major" element={<Major />} />
                  <Route path="pastcourses" element={<PastCourses />} />
                  <Route path="mydegree" element={<MyDegree />} />
                  <Route path="addmajor" element={<AddMajor />} />
                  <Route path="addminor" element={<AddMinor />} />
                  <Route path="coursesearch" element={<CourseSearch />} />
                </Routes>
              </AuthGuard>
            } />
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="*" element={<Navigate to="/Home" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
