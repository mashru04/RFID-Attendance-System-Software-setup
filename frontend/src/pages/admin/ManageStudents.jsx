import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { Plus, Edit2, Trash2, X, GraduationCap, AlertCircle, Sparkles } from "lucide-react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "CSE",
    semester: "1st",
    section: "A",
    cardId: "",
    email: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    try {
      const data = await adminService.getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormError("");
    setFormData({
      id: "",
      name: "",
      department: "CSE",
      semester: "1st",
      section: "A",
      cardId: "",
      email: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormError("");
    setFormData({ ...student });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await adminService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const typedId = formData.id.trim();

    // --- Validation (শুধু নতুন student add করার সময়) ---
    if (!editingStudent) {
      if (!typedId) {
        setFormError("Student ID is required.");
        return;
      }
      const duplicate = students.some((s) => String(s.id) === typedId);
      if (duplicate) {
        setFormError(`A student with ID "${typedId}" already exists.`);
        return;
      }
    }

    if (editingStudent) {
      const updated = await adminService.updateStudent(editingStudent.id, formData);
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...updated } : s))
      );
    } else {
      const payload = { ...formData, id: typedId };
      const created = await adminService.addStudent(payload);
      const finalStudent = { ...created, id: typedId };
      setStudents((prev) => [...prev, finalStudent]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: "Student ID",
      render: (row) => <span className="font-mono font-bold text-slate-800">{row.id}</span>,
    },
    {
      header: "Full Name",
      render: (row) => <span className="font-semibold text-[#384959]">{row.name}</span>,
    },
    { header: "Dept", accessor: "department" },
    {
      header: "Class",
      render: (row) => <span>Sem {row.semester} &bull; Sec {row.section}</span>,
    },
    {
      header: "RFID Card UID",
      render: (row) => (
        <span className="font-mono text-xs font-semibold bg-[#F4F7FB] text-[#384959] px-2.5 py-1 rounded-lg border border-slate-200">
          {row.cardId || "Unassigned"}
        </span>
      ),
    },
    { header: "Email Address", accessor: "email" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 text-[#384959] hover:text-white hover:bg-[#384959] rounded-lg transition"
            title="Edit Student"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition"
            title="Delete Student"
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
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">Student Management Directory</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Register, edit, or remove student profiles and hardware RFID tags
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#384959] hover:bg-[#273440] text-white text-xs font-bold rounded-xl shadow-md transition-all duration-150"
        >
          <Plus className="w-4 h-4 text-[#88BDF2]" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {loading ? (
        <Loader message="Loading student records..." />
      ) : (
        <Table columns={columns} data={students} emptyMessage="No students found." />
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
              <div className="p-3 rounded-2xl bg-[#BDDDFC]/30 text-[#384959] border border-[#BDDDFC]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#384959]">
                  {editingStudent ? "Edit Student Profile" : "Enroll New Student"}
                </h2>
                <p className="text-xs text-[#6A89A7]">
                  {editingStudent ? "Update credentials & card UID" : "Add student record to campus registry"}
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingStudent}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. 20230204099"
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
                  placeholder="e.g. Alex Johnson"
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
                  placeholder="alex@student.edu"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                    Dept
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-2 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="BBA">BBA</option>
                    <option value="ME">ME</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    placeholder="1st"
                    className="w-full px-2.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="A"
                    className="w-full px-2.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                  RFID Card UID
                </label>
                <input
                  type="text"
                  value={formData.cardId}
                  onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
                  placeholder="e.g. 03E59013"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2]"
                />
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
                  {editingStudent ? "Save Modifications" : "Confirm Enrollment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}