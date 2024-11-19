import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import StudentLogin from './studentpages/Login';
import ITLogin from './itpages/Login';
import StudentHome from './studentpages/StudentHome';
import Course from './itpages/Course';
import AddCourse from './itpages/AddCourse';
import UpdateCourse from './itpages/UpdateCourse';
import Lecture from './itpages/Lecture';
import AddLecture from './itpages/AddLecture';
import UpdateLecture from './itpages/UpdateLecture';
import Register from './itpages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentpages/Login" element={<StudentLogin />} />
        <Route path="/itpages/Login" element={<ITLogin />} />
        <Route path="/studentpages/StudentHome" element={<StudentHome />} />
        <Route path="/itpages/Course" element={<Course />} />
        <Route path="/itpages/AddCourse" element={<AddCourse />} />
        <Route path="/itpages/UpdateCourse/:id" element={<UpdateCourse />} />
        <Route path="/itpages/lecture/:CourseID" element={<Lecture />} /> 
        <Route path="/itpages/AddLecture/:CourseID" element={<AddLecture />} />
        <Route path="/itpages/UpdateLecture/:CourseID" element={<UpdateLecture />} />
        <Route path="/itpages/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
