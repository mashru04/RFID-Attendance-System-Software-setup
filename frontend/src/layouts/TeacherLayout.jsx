import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineSidebar from "../components/react-bits/LineSidebar";
import { LayoutDashboard, Calendar, Users } from "lucide-react";

export default function TeacherLayout() {
  const navItems = [
    { label: "Dashboard", path: "/teacher", icon: LayoutDashboard, end: true },
    { label: "Class Attendance", path: "/teacher/attendance", icon: Calendar },
    { label: "Class Roster", path: "/teacher/students", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      <Navbar title="Faculty Portal" />
      <div className="flex flex-1">
        <LineSidebar items={navItems} roleName="Teacher" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
