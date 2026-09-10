import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, Radio, User, Shield, GraduationCap, Briefcase } from "lucide-react";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3.5 h-3.5 text-[#88BDF2]" />;
      case "teacher":
        return <Briefcase className="w-3.5 h-3.5 text-[#88BDF2]" />;
      case "student":
        return <GraduationCap className="w-3.5 h-3.5 text-[#88BDF2]" />;
      default:
        return <User className="w-3.5 h-3.5 text-[#88BDF2]" />;
    }
  };

  return (
    <header className="bg-[#384959] text-white border-b border-[#273440] sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Context */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-[#88BDF2] to-[#BDDDFC] text-[#384959] p-1.5 rounded-lg text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
              RFID
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-tight">
                Attendance<span className="text-[#88BDF2]">Flow</span>
              </span>
              <span className="text-[10px] text-[#BDDDFC] font-medium leading-none">
                Smart Terminal System
              </span>
            </div>
          </Link>

          {title && (
            <div className="hidden sm:flex items-center space-x-2 border-l border-white/20 pl-4 py-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-[#BDDDFC]">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            to="/live"
            className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all duration-150 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>Live Monitor</span>
          </Link>

          {user && (
            <div className="flex items-center gap-3 border-l border-white/15 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-[#BDDDFC] uppercase tracking-wider font-semibold flex items-center justify-end gap-1 mt-0.5">
                  {getRoleIcon(user.role)}
                  {user.role}
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6A89A7] to-[#384959] border border-[#88BDF2]/40 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 rounded-xl text-[#BDDDFC] hover:text-white hover:bg-white/10 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
