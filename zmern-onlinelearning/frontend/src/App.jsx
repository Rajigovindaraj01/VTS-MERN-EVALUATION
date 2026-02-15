import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CourseDetails from "./pages/CourseDetails";
import Navbar from "./components/Navbar";
import MyCourses from "./pages/MyCourses";
import Feedback from "./pages/Feedback";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/mycourses" element={<MyCourses/>}></Route>
        <Route path="/feedback/:courseId" element={<Feedback/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
