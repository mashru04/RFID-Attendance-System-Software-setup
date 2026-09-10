import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import RoleSelect from "../pages/auth/RoleSelect";
import StudentLogin from "../pages/auth/StudentLogin";
import StudentRegister from "../pages/auth/StudentRegister";
import TeacherLogin from "../pages/auth/TeacherLogin";
import TeacherRegister from "../pages/auth/TeacherRegister";
import AdminLogin from "../pages/auth/AdminLogin";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import MyAttendance from "../pages/student/MyAttendance";
import MyProfile from "../pages/student/MyProfile";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import ClassAttendance from "../pages/teacher/ClassAttendance";
import StudentList from "../pages/teacher/StudentList";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageStudents from "../pages/admin/ManageStudents";
import ManageTeachers from "../pages/admin/ManageTeachers";
import ManageCards from "../pages/admin/ManageCards";
import AllAttendance from "../pages/admin/AllAttendance";

// Common Pages
import LiveDashboard from "../pages/LiveDashboard";
import Unauthorized from "../pages/common/Unauthorized";
import NotFound from "../pages/common/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RoleSelect />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/register" element={<TeacherRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/live" element={<LiveDashboard />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="profile" element={<MyProfile />} />
        </Route>
      </Route>

      {/* Teacher Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="attendance" element={<ClassAttendance />} />
          <Route path="students" element={<StudentList />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="cards" element={<ManageCards />} />
          <Route path="attendance" element={<AllAttendance />} />
        </Route>
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
