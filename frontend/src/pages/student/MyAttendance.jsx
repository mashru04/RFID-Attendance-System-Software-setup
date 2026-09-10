import React, { useState, useEffect } from "react";
import { studentService } from "../../services/studentService";
import { useAuth } from "../../hooks/useAuth";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { CalendarCheck, Shield } from "lucide-react";

export default function MyAttendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttendance() {
      if (user?.id) {
        try {
          const data = await studentService.getMyAttendance(user.id);
          setAttendance(data);
        } catch (err) {
          console.error("Failed to load student attendance", err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadAttendance();
  }, [user]);

  const columns = [
    { header: "Log ID", accessor: "id" },
    { header: "Date", accessor: "date" },
    {
      header: "Punch Time",
      render: (row) => <span className="font-mono font-semibold">{row.punchTime}</span>,
    },
    { header: "Course ID", accessor: "courseId" },
    { header: "Scanner Terminal", accessor: "deviceId" },
    {
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (loading) {
    return <Loader message="Fetching your RFID attendance history..." />;
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">My Attendance History</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Detailed log of all smart RFID tap events recorded for your student profile
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-soft text-xs font-semibold text-[#384959]">
          <CalendarCheck className="w-4 h-4 text-[#88BDF2]" />
          <span>Total Recorded Logs: <strong>{attendance.length}</strong></span>
        </div>
      </div>

      <Table
        columns={columns}
        data={attendance}
        emptyMessage="No attendance logs found for your student ID."
      />
    </div>
  );
}
