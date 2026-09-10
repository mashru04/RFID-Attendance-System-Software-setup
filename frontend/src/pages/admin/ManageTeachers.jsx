import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { Plus, Edit2, Trash2, X, Briefcase, Check, ShieldAlert } from "lucide-react";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "CSE",
    email: "",
    assignedCourses: "CSE101, CSE201",
    isApproved: true,
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    setLoading(true);
    try {
      const data = await adminService.getTeachers();
      const mapped = data.map((t) => ({
        ...t,
        isApproved: t.isApproved !== undefined ? t.isApproved : true,
      }));
      setTeachers(mapped);
    } catch (err) {
      console.error("Failed to load teachers", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      id: "",
      name: "",
      department: "CSE",
      email: "",
      assignedCourses: "",
      isApproved: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      ...teacher,
      assignedCourses: Array.isArray(teacher.assignedCourses)
        ? teacher.assignedCourses.join(", ")
        : teacher.assignedCourses || "",
      isApproved: teacher.isApproved !== undefined ? teacher.isApproved : true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      await adminService.deleteTeacher(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleToggleApprove = (id) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isApproved: !t.isApproved } : t))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      assignedCourses: formData.assignedCourses
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    if (editingTeacher) {
      const updated = await adminService.updateTeacher(editingTeacher.id, formattedData);
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingTeacher.id ? { ...t, ...updated } : t))
      );
    } else {
      const created = await adminService.addTeacher(formattedData);
      setTeachers((prev) => [...prev, created]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: "Teacher ID",
      render: (row) => <span className="font-mono font-bold text-slate-800">{row.id}</span>,
    },
    {
      header: "Faculty Name",
      render: (row) => <span className="font-semibold text-[#384959]">{row.name}</span>,
    },
    { header: "Dept", accessor: "department" },
    { header: "Email Address", accessor: "email" },
    {
      header: "Courses",
      render: (row) => (
        <span className="text-xs text-[#6A89A7] font-medium">
          {Array.isArray(row.assignedCourses) ? row.assignedCourses.join(", ") : row.assignedCourses}
        </span>
      ),
    },
    {
      header: "Account Approval",
      render: (row) => (
        <button
          onClick={() => handleToggleApprove(row.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${
            row.isApproved
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
          }`}
          title="Click to toggle faculty authorization status"
        >
          {row.isApproved ? <Check className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
          <span>{row.isApproved ? "Approved" : "Pending Review"}</span>
        </button>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 text-[#384959] hover:text-white hover:bg-[#384959] rounded-lg transition"
            title="Edit Faculty"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition"
            title="Delete Faculty"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">Faculty Management</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Authorize instructor accounts, course allocations, and verification approval
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#384959] hover:bg-[#273440] text-white text-xs font-bold rounded-xl shadow-md transition-all duration-150"
        >
          <Plus className="w-4 h-4 text-[#88BDF2]" />
          <span>Register New Faculty</span>
        </button>
      </div>

      {loading ? (
        <Loader message="Loading faculty directory..." />
      ) : (
        <Table columns={columns} data={teachers} emptyMessage="No faculty members found." />
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-soft-lg border border-slate-200 w-full max-w-md p-6 sm:p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 absolute top-5 right-5 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#6A89A7]/20 text-[#384959] border border-[#6A89A7]/30">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#384959]">
                  {editingTeacher ? "Edit Faculty Profile" : "Register New Faculty"}
                </h2>
                <p className="text-xs text-[#6A89A7]">
                  {editingTeacher ? "Modify department & course assignment" : "Onboard new university instructor"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Teacher ID
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingTeacher}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. T-105"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@faculty.edu"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="EEE">Electrical & Electronic Engineering (EEE)</option>
                  <option value="BBA">Business Administration (BBA)</option>
                  <option value="ME">Mechanical Engineering (ME)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Assigned Courses (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.assignedCourses}
                  onChange={(e) => setFormData({ ...formData, assignedCourses: e.target.value })}
                  placeholder="e.g. CSE101, CSE202"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="teacherApproveCheck"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#384959] focus:ring-[#88BDF2]"
                />
                <label htmlFor="teacherApproveCheck" className="font-semibold text-slate-700 cursor-pointer">
                  Account Verified & Authorized for Attendance Marking
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#384959] hover:bg-[#273440] text-white rounded-xl font-bold shadow-md"
                >
                  {editingTeacher ? "Save Modifications" : "Confirm Faculty Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
