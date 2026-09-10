import React, { useState, useEffect } from "react";
import { studentService } from "../../services/studentService";
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import StatusBadge from "../../components/StatusBadge";
import { CheckCircle2, Clock, XCircle, BarChart3, Calendar, Sparkles, ShieldCheck } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (user?.id) {
        try {
          const data = await studentService.getMyDashboard(user.id);
          setStats(data);
        } catch (err) {
          console.error("Failed to load student dashboard", err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadDashboard();
  }, [user]);

  if (loading) {
    return <Loader message="Loading student dashboard metrics..." />;
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#384959] to-[#273440] rounded-3xl p-6 sm:p-8 text-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#BDDDFC] text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#88BDF2]" />
            <span>Active Student Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.name || "Student"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#BDDDFC]/80 mt-1">
            Student ID: <span className="font-mono text-white font-bold">{user?.id}</span> &bull; RFID Badge:{" "}
            <span className="font-mono text-[#88BDF2] font-semibold">{user?.cardId || "03E59013"}</span>
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/10 border border-white/15 px-4 py-3 rounded-2xl backdrop-blur-md">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-[#BDDDFC] font-bold">Today's Punch Status</p>
            <div className="mt-1">
              <StatusBadge status={stats?.todayStatus} />
            </div>
          </div>
          <Calendar className="w-6 h-6 text-[#88BDF2]" />
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#88BDF2]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Numerical Stats with React Bits Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          title="Attendance Rate"
          value={stats?.percentage || 0}
          suffix="%"
          subtitle="Cumulative semester ratio"
          icon={BarChart3}
          color="sky"
        />

        <Card
          title="Total Present"
          value={stats?.present || 0}
          subtitle={`Out of ${stats?.total || 0} recorded sessions`}
          icon={CheckCircle2}
          color="present"
        />

        <Card
          title="Late Punches"
          value={stats?.late || 0}
          subtitle="Recorded past grace period"
          icon={Clock}
          color="late"
        />

        <Card
          title="Absent Sessions"
          value={stats?.absent || 0}
          subtitle="Unverified classroom periods"
          icon={XCircle}
          color="absent"
        />
      </div>

      {/* Reminder Banner */}
      <div className="bg-white border border-[#BDDDFC]/60 rounded-2xl p-5 shadow-soft flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#BDDDFC]/30 text-[#384959] shrink-0 border border-[#BDDDFC]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#384959]">RFID Card Scanner Protocol</h2>
          <p className="text-xs text-[#6A89A7] mt-1 leading-relaxed">
            Ensure your physical RFID card is held steady against the classroom reader for at least 1 second.
            The terminal beeps once to log <strong>Present</strong> status before lecture start.
          </p>
        </div>
      </div>
    </div>
  );
}
