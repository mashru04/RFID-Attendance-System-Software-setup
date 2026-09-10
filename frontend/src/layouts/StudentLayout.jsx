import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineSidebar from "../components/react-bits/LineSidebar";
import { LayoutDashboard, CalendarCheck, User } from "lucide-react";

export default function StudentLayout() {
  const navItems = [
    { label: "Dashboard", path: "/student", icon: LayoutDashboard, end: true },
    { label: "My Attendance", path: "/student/attendance", icon: CalendarCheck },
    { label: "Student ID Card", path: "/student/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      <Navbar title="Student Portal" />
      <div className="flex flex-1">
        <LineSidebar items={navItems} roleName="Student" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
