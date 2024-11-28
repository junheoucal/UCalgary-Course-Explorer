import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ITLogin from "./itpages/Login";
import StudentLogin from "./studentpages/Login";
import StudentRegister from "./studentpages/Register";
import Register from "./itpages/Register";
import Course from "./itpages/Course";
import AuthGuard from "./components/AuthGuard";
import AddCourse from "./itpages/AddCourse";
import UpdateCourse from "./itpages/UpdateCourse";
import Lecture from "./itpages/Lecture";
import AddLecture from "./itpages/AddLecture";
import UpdateLecture from "./itpages/UpdateLecture";
import StudentHome from "./studentpages/StudentHome";
import CurrentEnrollment from "./studentpages/CurrentEnrollment";
import AddEnrollment from "./studentpages/AddEnrollment";
import PastCourses from "./studentpages/PastCourses";
import MyDegree from "./studentpages/MyDegree";
import CourseSearch from "./studentpages/CourseSearch";
import MyCourses from "./studentpages/MyCourses";
import CoursePage from "./studentpages/CoursePage";
import Tutorial from "./itpages/Tutorial";
import UpdateTutorial from "./itpages/UpdateTutorial";
import AddTutorial from "./itpages/AddTutorial";
import Home from "./Home";

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
            <Route path="/studentpages/register" element={<Register />} />
            <Route
              path="/studentpages/*"
              element={
                <AuthGuard userType="student">
                  <Routes>
                    <Route path="home" element={<StudentHome />} />
                    <Route path="courses" element={<CoursePage />} />
                    <Route path="mycourses" element={<MyCourses />} />
                    <Route
                      path="currentenrollment"
                      element={<CurrentEnrollment />}
                    />
                    <Route path="addenrollment" element={<AddEnrollment />} />
                    <Route path="pastcourses" element={<PastCourses />} />
                    <Route path="mydegree" element={<MyDegree />} />
                    <Route path="coursesearch" element={<CourseSearch />} />
                    <Route
                      path="CoursePage/:CourseID"
                      element={<CoursePage />}
                    />
                  </Routes>
                </AuthGuard>
              }
            />
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="*" element={<Navigate to="/Home" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
