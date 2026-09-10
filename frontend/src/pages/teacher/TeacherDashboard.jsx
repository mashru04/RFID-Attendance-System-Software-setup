import React, { useState, useEffect } from "react";
import { teacherService } from "../../services/teacherService";
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { BookOpen, Users, CheckCircle2, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (user?.id) {
        try {
          const data = await teacherService.getTeacherDashboard(user.id);
          setStats(data);
        } catch (err) {
          console.error("Failed to load teacher dashboard", err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadDashboard();
  }, [user]);

  if (loading) {
    return <Loader message="Loading faculty metrics..." />;
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Faculty Hero Banner */}
      <div className="bg-gradient-to-r from-[#384959] to-[#273440] rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#BDDDFC] text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Faculty Instructor Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, {user?.name || "Professor"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#BDDDFC]/80 mt-1">
            Teacher ID: <span className="font-mono text-white font-bold">{user?.id}</span> &bull; Department:{" "}
            <span className="text-[#88BDF2] font-semibold">{user?.department || "CSE"} Engineering</span>
          </p>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#88BDF2]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Numeric Stats with React Bits Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card
          title="Assigned Courses"
          value={stats?.assignedClasses || 0}
          subtitle="Active course sections"
          icon={BookOpen}
          color="sky"
        />

        <Card
          title="Today's Verified Punches"
          value={stats?.todayPresentCount || 0}
          subtitle="Students marked present via RFID"
          icon={CheckCircle2}
          color="present"
        />

        <Card
          title="Enrolled Students"
          value={stats?.totalStudentsInClasses || 0}
          subtitle="Department course enrollment"
          icon={Users}
          color="primary"
        />
      </div>

      {/* Action Shortcut Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#BDDDFC]/30 text-[#384959] border border-[#BDDDFC] flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#384959] text-base">Class Attendance Explorer</h2>
            <p className="text-xs text-[#6A89A7] mt-1.5 leading-relaxed">
              Filter and examine lecture attendance logs by specific dates. Check real-time swipe times and absent records.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/teacher/attendance"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] group-hover:text-[#273440]"
            >
              <span>Inspect Class Attendance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#6A89A7]/20 text-[#384959] border border-[#6A89A7]/30 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#384959] text-base">Enrolled Student Roster</h2>
            <p className="text-xs text-[#6A89A7] mt-1.5 leading-relaxed">
              Access the complete roster of registered students, verify student IDs, and check their hardware RFID card UID status.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/teacher/students"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] group-hover:text-[#273440]"
            >
              <span>View Enrolled Students</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
