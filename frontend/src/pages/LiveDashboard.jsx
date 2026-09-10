import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "../services/dashboardService";
import PillNav from "../components/react-bits/PillNav";
import Counter from "../components/react-bits/Counter";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Radio,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
  Wifi,
  Home,
  GraduationCap,
  Briefcase,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

export default function LiveDashboard() {
  const [stats, setStats] = useState(null);
  const [liveFeed, setLiveFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    async function fetchInitial() {
      try {
        const [statsData, feedData] = await Promise.all([
          dashboardService.getTodayStats(),
          dashboardService.getLiveFeed(),
        ]);
        setStats(statsData);
        setLiveFeed(feedData);
      } catch (err) {
        console.error("Failed to load live data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();

    // Poll live feed periodically (every 4 seconds)
    const interval = setInterval(async () => {
      try {
        const [newFeed, refreshedStats] = await Promise.all([
          dashboardService.getLiveFeed(),
          dashboardService.getTodayStats(),
        ]);
        setLiveFeed(newFeed);
        if (refreshedStats) setStats(refreshedStats);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Feed poll error", err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Role Portal", path: "/", icon: Home },
    { label: "Live Telemetry", path: "/live", icon: Radio },
    { label: "Student Login", path: "/student/login", icon: GraduationCap },
    { label: "Teacher Login", path: "/teacher/login", icon: Briefcase },
    { label: "Admin", path: "/admin/login", icon: Shield },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#384959] flex items-center justify-center">
        <Loader message="Connecting to live RFID attendance stream..." />
      </div>
    );
  }

  // Chart data derived from existing service numbers
  const pieData = [
    { name: "Present", value: stats?.present || 0, color: "#22C55E" },
    { name: "Late", value: stats?.late || 0, color: "#F59E0B" },
    { name: "Absent", value: stats?.absent || 0, color: "#EF4444" },
  ];

  // Derive bar chart data: group punches by gate or use breakdown
  const barData = [
    { category: "Present", count: stats?.present || 0, fill: "#22C55E" },
    { category: "Late", count: stats?.late || 0, fill: "#F59E0B" },
    { category: "Absent", count: stats?.absent || 0, fill: "#EF4444" },
  ];

  return (
    <div className="min-h-screen bg-[#273440] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar with PillNav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#88BDF2] to-[#BDDDFC] flex items-center justify-center text-[#384959] font-black shadow-lg">
              RFID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Live Attendance Terminal
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  LIVE STREAM
                </span>
              </div>
              <p className="text-xs text-[#BDDDFC]/70">
                Classroom Gate & Card Scanner Telemetry
              </p>
            </div>
          </div>

          <PillNav
              items={navItems}
              baseColor="rgba(56, 73, 89, 0.85)"
              baseBorder="rgba(136, 189, 242, 0.25)"
              pillColor="#BDDDFC"
              pillColorEnd="#88BDF2"
              pillTextColor="#BDDDFC"
              activeTextColor="#384959"
            />

          <div className="flex items-center gap-4 text-xs text-[#BDDDFC]/80 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>Gate Status: <strong>Online</strong></span>
            </div>
            <div className="border-l border-white/10 pl-3">
              Synced: <span className="font-mono text-white font-semibold">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Large Animated Counter Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-xl hover:border-[#88BDF2]/40 transition duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#BDDDFC]">Total Scans Today</p>
                <div className="text-4xl font-black text-white mt-2">
                  <Counter value={stats?.total || 0} />
                </div>
                <p className="text-xs text-[#6A89A7] mt-1">Recorded credential events</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 text-[#88BDF2] border border-blue-500/20">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#88BDF2] to-[#BDDDFC] rounded-full w-full" />
            </div>
          </div>

          {/* Present */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-xl hover:border-emerald-500/40 transition duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">On-Time Present</p>
                <div className="text-4xl font-black text-emerald-400 mt-2">
                  <Counter value={stats?.present || 0} />
                </div>
                <p className="text-xs text-[#6A89A7] mt-1">Verified timely arrivals</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                style={{
                  width: `${stats?.total ? (stats.present / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Late */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-xl hover:border-amber-500/40 transition duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Late Arrivals</p>
                <div className="text-4xl font-black text-amber-400 mt-2">
                  <Counter value={stats?.late || 0} />
                </div>
                <p className="text-xs text-[#6A89A7] mt-1">Scanned past grace period</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                style={{
                  width: `${stats?.total ? (stats.late / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Absent */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-xl hover:border-rose-500/40 transition duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Unrecorded / Absent</p>
                <div className="text-4xl font-black text-rose-400 mt-2">
                  <Counter value={stats?.absent || 0} />
                </div>
                <p className="text-xs text-[#6A89A7] mt-1">Pending swipe confirmation</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EF4444] rounded-full transition-all duration-500"
                style={{
                  width: `${stats?.total ? (stats.absent / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Charts & Visual Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Donut Chart: Present vs Late vs Absent */}
          <div className="lg:col-span-4 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#88BDF2]" /> Attendance Ratio Split
              </h3>
              <p className="text-xs text-[#BDDDFC]/70 mt-1">Proportional distribution of today's attendance</p>
            </div>
            <div className="h-64 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#384959",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-[#BDDDFC]">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[11px] text-[#6A89A7]">
              Real-time calculations based on active session punches
            </div>
          </div>

          {/* Bar Chart: Distribution */}
          <div className="lg:col-span-4 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#88BDF2]" /> Volume by Status
              </h3>
              <p className="text-xs text-[#BDDDFC]/70 mt-1">Direct count comparison across recorded logs</p>
            </div>
            <div className="h-64 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                  <XAxis dataKey="category" stroke="#6A89A7" fontSize={11} tickLine={false} />
                  <YAxis stroke="#6A89A7" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#384959",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-[11px] text-[#6A89A7]">
              Automated gate telemetry counters
            </div>
          </div>

          {/* Live Feed Ticker Panel */}
          <div className="lg:col-span-4 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Live Punch Ticker</h3>
              </div>
              <span className="text-[10px] text-[#88BDF2] font-semibold tracking-wider">REFRESHING</span>
            </div>

            <div className="divide-y divide-white/5 my-2 max-h-[250px] overflow-y-auto pr-1">
              {liveFeed.map((punch, idx) => (
                <div
                  key={punch.id || idx}
                  className="py-3 flex items-center justify-between hover:bg-white/5 px-2 rounded-xl transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#88BDF2]/30 to-[#BDDDFC]/20 text-white font-bold text-xs flex items-center justify-center border border-white/10">
                      {punch.studentName ? punch.studentName.charAt(0).toUpperCase() : "S"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{punch.studentName}</p>
                      <p className="text-[10px] text-[#6A89A7]">
                        ID: {punch.studentId} &bull; Gate: {punch.deviceId}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-xs font-semibold text-white">
                      {punch.punchTime}
                    </span>
                    <StatusBadge status={punch.status} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-[11px] text-[#6A89A7] border-t border-white/10">
              Auto-syncs every 4 seconds from classroom gates
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
