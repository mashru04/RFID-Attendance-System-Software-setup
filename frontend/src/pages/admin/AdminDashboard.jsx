import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { Users, Briefcase, CheckCircle2, CreditCard, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await adminService.getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <Loader message="Gathering system telemetry & analytics..." />;
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Admin Hero Banner */}
      <div className="bg-gradient-to-r from-[#273440] via-[#384959] to-[#273440] rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#BDDDFC] text-xs font-semibold mb-3 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Root Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            System Control Center
          </h1>
          <p className="text-xs sm:text-sm text-[#BDDDFC]/80 mt-1">
            Real-time RFID terminal status, faculty verifications, and student credentials
          </p>
        </div>

        <div className="relative z-10">
          <Link
            to="/live"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#88BDF2] text-[#384959] text-xs font-bold hover:bg-[#BDDDFC] transition shadow-md"
          >
            <span>Open Live Wall Monitor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#88BDF2]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Numeric Stats with React Bits Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          title="Total Students"
          value={stats?.totalStudents || 0}
          subtitle="Registered student profiles"
          icon={Users}
          color="sky"
        />

        <Card
          title="Faculty Members"
          value={stats?.totalTeachers || 0}
          subtitle="Authorized instructors"
          icon={Briefcase}
          color="primary"
        />

        <Card
          title="Present Today"
          value={stats?.todayPresent || 0}
          subtitle="On-time check-ins recorded"
          icon={CheckCircle2}
          color="present"
        />

        <Card
          title="Total Punches Today"
          value={stats?.todayTotalPunches || 0}
          subtitle="RFID card tap events"
          icon={CreditCard}
          color="dark"
        />
      </div>

      {/* Admin Modules Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#BDDDFC]/30 text-[#384959] border border-[#BDDDFC] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#384959] text-base">Student Directory</h2>
            <p className="text-xs text-[#6A89A7] mt-1.5 leading-relaxed">
              Enroll new student records, update demographic information, or unbind lost RFID tags.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/admin/students"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] group-hover:text-[#273440]"
            >
              <span>Manage Students</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#6A89A7]/20 text-[#384959] border border-[#6A89A7]/30 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#384959] text-base">Faculty Directory</h2>
            <p className="text-xs text-[#6A89A7] mt-1.5 leading-relaxed">
              Approve pending teacher signups, assign course curriculum codes, and manage permissions.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/admin/teachers"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] group-hover:text-[#273440]"
            >
              <span>Manage Teachers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#88BDF2]/20 text-[#384959] border border-[#88BDF2]/40 flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-[#384959] text-base">Hardware Card Registry</h2>
            <p className="text-xs text-[#6A89A7] mt-1.5 leading-relaxed">
              Inspect physical RFID transponder UID mappings and verify active pairing with student IDs.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/admin/cards"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] group-hover:text-[#273440]"
            >
              <span>View RFID Mappings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
