import React, { useState, useEffect } from "react";
import { teacherService } from "../../services/teacherService";
import { useAuth } from "../../hooks/useAuth";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { Calendar, Filter } from "lucide-react";

export default function ClassAttendance() {
  const { user } = useAuth();
  const [date, setDate] = useState("2023-10-25"); // seeded dummy date for instant records
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttendance() {
      if (user?.id) {
        setLoading(true);
        try {
          const data = await teacherService.getClassAttendance(user.id, date);
          setRecords(data);
        } catch (err) {
          console.error("Failed to load class attendance", err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadAttendance();
  }, [user, date]);

  const columns = [
    { header: "Log ID", accessor: "id" },
    { header: "Student ID", accessor: "studentId" },
    {
      header: "Student Name",
      render: (row) => <span className="font-bold text-slate-800">{row.studentName}</span>,
    },
    { header: "Course ID", accessor: "courseId" },
    {
      header: "Punch Time",
      render: (row) => <span className="font-mono font-semibold">{row.punchTime}</span>,
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
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">Class Attendance Records</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            RFID check-in logs for courses taught by your faculty profile
          </p>
        </div>

        {/* Date Filter Bar */}
        <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-soft">
          <Calendar className="w-4 h-4 text-[#88BDF2]" />
          <label htmlFor="teacherDatePicker" className="text-xs font-bold text-[#384959]">
            Filter Date:
          </label>
          <input
            id="teacherDatePicker"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {loading ? (
        <Loader message={`Fetching class records for ${date}...`} />
      ) : (
        <Table
          columns={columns}
          data={records}
          emptyMessage={`No attendance records found for ${date}. (Try picking 2023-10-25 or 2023-10-26 to view seeded logs)`}
        />
      )}
    </div>
  );
}
