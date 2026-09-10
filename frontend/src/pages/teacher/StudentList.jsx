import React, { useState, useEffect } from "react";
import { teacherService } from "../../services/teacherService";
import { useAuth } from "../../hooks/useAuth";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { Users, CreditCard } from "lucide-react";

export default function StudentList() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      if (user?.id) {
        try {
          const data = await teacherService.getMyStudents(user.id);
          setStudents(data);
        } catch (err) {
          console.error("Failed to load students list", err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadStudents();
  }, [user]);

  const columns = [
    {
      header: "Student ID",
      render: (row) => <span className="font-mono font-bold text-slate-800">{row.id}</span>,
    },
    {
      header: "Name",
      render: (row) => <span className="font-semibold text-[#384959]">{row.name}</span>,
    },
    { header: "Dept", accessor: "department" },
    {
      header: "Class",
      render: (row) => <span>Sem {row.semester} &bull; Sec {row.section}</span>,
    },
    { header: "Email Address", accessor: "email" },
    {
      header: "RFID Card UID",
      render: (row) => (
        <span className="font-mono text-xs font-semibold bg-[#F4F7FB] text-[#384959] px-2.5 py-1 rounded-lg border border-slate-200">
          {row.cardId || "Unassigned"}
        </span>
      ),
    },
  ];

  if (loading) {
    return <Loader message="Loading student roster directory..." />;
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">Enrolled Students Roster</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Directory of all students currently enrolled in your departmental course sections
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-soft text-xs font-semibold text-[#384959]">
          <Users className="w-4 h-4 text-[#88BDF2]" />
          <span>Total Students: <strong>{students.length}</strong></span>
        </div>
      </div>

      <Table
        columns={columns}
        data={students}
        emptyMessage="No enrolled students found."
      />
    </div>
  );
}
