import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { Filter, Calendar, RotateCcw } from "lucide-react";

export default function AllAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: "",
    status: "",
  });

  useEffect(() => {
    loadAttendance();
  }, [filters]);

  async function loadAttendance() {
    setLoading(true);
    try {
      const data = await adminService.getAllAttendance(filters);
      setRecords(data);
    } catch (err) {
      console.error("Failed to load attendance records", err);
    } finally {
      setLoading(false);
    }
  }

  const handleResetFilters = () => {
    setFilters({ date: "", status: "" });
  };

  const columns = [
    { header: "Record ID", accessor: "id" },
    { header: "Date", accessor: "date" },
    {
      header: "Student ID",
      render: (row) => <span className="font-mono font-bold text-slate-800">{row.studentId}</span>,
    },
    {
      header: "Student Name",
      render: (row) => <span className="font-semibold text-[#384959]">{row.studentName}</span>,
    },
    { header: "Course ID", accessor: "courseId" },
    {
      header: "Punch Time",
      render: (row) => <span className="font-mono font-semibold">{row.punchTime}</span>,
    },
    {
      header: "Scanner Terminal",
      render: (row) => (
        <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
          {row.deviceId}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">System Attendance Telemetry</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Universal audit log of all RFID check-in events recorded across university gates
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-soft">
            <Calendar className="w-3.5 h-3.5 text-[#88BDF2]" />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="bg-transparent border-none focus:outline-none text-slate-700 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-soft">
            <Filter className="w-3.5 h-3.5 text-[#88BDF2]" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="bg-transparent border-none focus:outline-none text-slate-700 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {(filters.date || filters.status) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#6A89A7] hover:text-[#384959] font-bold px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-soft transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <Loader message="Querying attendance audit logs..." />
      ) : (
        <Table
          columns={columns}
          data={records}
          emptyMessage="No attendance records match the selected filter criteria."
        />
      )}
    </div>
  );
}
