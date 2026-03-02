import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Materi from "./pages/Materi";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Mentoring from "./pages/Mentoring";
import Tracker from "./pages/Tracker";
import BankMateri from "./pages/BankMateri";
import Subscription from "./pages/Subscription";
import Gamification from "./pages/Gamification";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi/:majorId/:courseId" element={<CourseDetail />} />
          <Route
            path="/materi/:majorId/:courseId/:lessonId"
            element={<LessonPlayer />}
          />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/bank-materi" element={<BankMateri />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
