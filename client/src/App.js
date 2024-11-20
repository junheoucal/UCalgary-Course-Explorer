import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './itpages/Login';
import Register from './itpages/Register';
import Course from './itpages/Course';
import AuthGuard from './components/AuthGuard';
import AddCourse from './itpages/AddCourse';
import UpdateCourse from './itpages/UpdateCourse';
import Lecture from './itpages/Lecture';
import AddLecture from './itpages/AddLecture';
import UpdateLecture from './itpages/UpdateLecture';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course" element={
              <AuthGuard>
                <Course />
              </AuthGuard>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
