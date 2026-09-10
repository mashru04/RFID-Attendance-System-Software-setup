import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineSidebar from "../components/react-bits/LineSidebar";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  CreditCard,
  ClipboardList,
} from "lucide-react";

export default function AdminLayout() {
  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { label: "Manage Students", path: "/admin/students", icon: GraduationCap },
    { label: "Manage Teachers", path: "/admin/teachers", icon: Briefcase },
    { label: "RFID Card Registry", path: "/admin/cards", icon: CreditCard },
    { label: "All Attendance Logs", path: "/admin/attendance", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      <Navbar title="Administration Control" />
      <div className="flex flex-1">
        <LineSidebar items={navItems} roleName="Admin" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
