import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import StudentLogin from "./studentpages/Login";
import ITLogin from "./itpages/Login";
import StudentHome from "./studentpages/StudentHome";
import Course from "./itpages/Course";
import AddCourse from "./itpages/AddCourse";
import UpdateCourse from "./itpages/UpdateCourse";
import MyCourses from "./studentpages/MyCourses";
import CourseSearch from "./studentpages/CourseSearch";
import MyDegree from "./studentpages/MyDegree";
import CoursePage from "./studentpages/CoursePage";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentpages/Login" element={<StudentLogin />} />
          <Route path="/itpages/Login" element={<ITLogin />} />
          <Route path="/studentpages/StudentHome" element={<StudentHome />} />
          <Route path="/itpages/Course" element={<Course />} />
          <Route path="/itpages/AddCourse" element={<AddCourse />} />
          <Route path="/itpages/UpdateCourse/:id" element={<UpdateCourse />} />
          <Route path="/studentpages/MyCourses" element={<MyCourses />} />
          <Route path="/studentpages/CourseSearch" element={<CourseSearch />} />
          <Route path="/studentpages/MyDegree" element={<MyDegree />} />
          <Route path="/studentpages/:CourseID" element={<CoursePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
