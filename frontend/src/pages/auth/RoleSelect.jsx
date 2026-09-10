import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PillNav from "../../components/react-bits/PillNav";
import { GraduationCap, Briefcase, ShieldCheck, Radio, Sparkles, ArrowRight } from "lucide-react";
import bgImage from "../../assets/bg.png";

export default function RoleSelect() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Live Dashboard", path: "/live", icon: Radio },
    { label: "Admin Portal", path: "/admin/login", icon: ShieldCheck },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden font-sans bg-fixed"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Semi-transparent overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-0" />

      {/* Pill Nav on Top */}
      <div className="w-full max-w-4xl flex justify-center pt-2 relative z-10">
        <PillNav
            items={navItems}
            baseColor="rgba(255, 255, 255, 0.5)"
            baseBorder="rgba(255, 255, 255, 0.4)"
            pillColor="#88BDF2"
            pillColorEnd="#BDDDFC"
            pillTextColor="#384959"
            activeTextColor="#1e293b"
          />
      </div>

      {/* Center Cards Container - Glassmorphism */}
      <div className="w-full max-w-2xl bg-white/50 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-8 sm:p-12 text-center my-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/60 text-[#384959] text-xs font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#88BDF2]" />
          <span>RFID Smart Campus Gateway</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#384959] tracking-tight mb-3 drop-shadow-sm">
          Select Your Portal
        </h1>
        <p className="text-sm text-[#384959] font-medium max-w-md mx-auto mb-10 leading-relaxed">
          Welcome to the automated RFID Attendance verification system. Please select your authorized role to access your dashboard.
        </p>

        {/* Big Portal Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
          
          {/* Student Card */}
          <div
            onClick={() => navigate("/student/login")}
            className="group relative cursor-pointer p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-lg hover:border-white/80 hover:bg-white/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/60 text-[#384959] border border-white/50 flex items-center justify-center mb-4 group-hover:bg-[#88BDF2] group-hover:text-white transition-colors duration-200 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#384959] group-hover:text-[#273440]">
                Student
              </h2>
              <p className="text-xs text-[#384959] font-medium mt-1.5 leading-relaxed">
                Check daily check-in logs, view smart badge details, and monitor overall attendance rate.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/40 flex items-center justify-between text-xs font-bold text-[#384959] group-hover:text-[#273440]">
              <span>Enter Student Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => navigate("/teacher/login")}
            className="group relative cursor-pointer p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-lg hover:border-white/80 hover:bg-white/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/60 text-[#384959] border border-white/50 flex items-center justify-center mb-4 group-hover:bg-[#384959] group-hover:text-white transition-colors duration-200 shadow-sm">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#384959] group-hover:text-[#273440]">
                Faculty
              </h2>
              <p className="text-xs text-[#384959] font-medium mt-1.5 leading-relaxed">
                Review classroom punch records by date, verify student attendance, and inspect rosters.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/40 flex items-center justify-between text-xs font-bold text-[#384959] group-hover:text-[#273440]">
              <span>Enter Faculty Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Small Admin Link Below */}
        <div className="pt-6 border-t border-white/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#384959] font-medium">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 font-bold text-[#384959] hover:text-[#273440] hover:underline"
          >
            <ShieldCheck className="w-4 h-4 text-[#88BDF2]" />
            <span>Administrator Control Login &rarr;</span>
          </Link>

          <Link
            to="/live"
            className="inline-flex items-center gap-1.5 font-bold text-rose-600 hover:text-rose-700"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Launch Live Big-Screen Monitor</span>
          </Link>
        </div>

      </div>

      {/* Footer text */}
      <p className="text-xs text-[#384959] font-bold relative z-10 drop-shadow-sm">
        RFID Smart Attendance Infrastructure &bull; Secure Departmental Terminal
      </p>
    </div>
  );
}
