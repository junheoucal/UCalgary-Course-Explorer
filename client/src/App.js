import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import StudentLogin from './studentpages/Login';
import ITLogin from './itpages/Login';
import StudentHome from './studentpages/StudentHome';
import ITHome from './itpages/ITHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentpages/Login" element={<StudentLogin />} />
        <Route path="/itpages/Login" element={<ITLogin />} />
        <Route path="/studentpages/StudentHome" element={<StudentHome />} />
        <Route path="/itpages/ITHome" element={<ITHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
