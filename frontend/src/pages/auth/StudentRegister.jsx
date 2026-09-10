import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { GraduationCap, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "CSE",
    semester: "1st",
    section: "A",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register({ ...formData, role: "student" });
      setSuccess(true);
      setTimeout(() => {
        navigate("/student/login");
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center px-4 py-12 relative font-sans">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-soft-lg p-8 sm:p-10">
        <Link
          to="/student/login"
          className="inline-flex items-center text-xs font-semibold text-[#6A89A7] hover:text-[#384959] mb-6 gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Login
        </Link>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-[#BDDDFC]/30 text-[#384959] border border-[#BDDDFC] shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#384959]">Student Registration</h2>
            <p className="text-xs text-[#6A89A7]">Create a new student enrollment profile</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Registration simulated successfully! Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
              Student ID
            </label>
            <input
              type="text"
              name="id"
              required
              value={formData.id}
              onChange={handleChange}
              placeholder="e.g. 20230204099"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@student.edu"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                Dept
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-2.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
              >
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="BBA">BBA</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                Semester
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="1st"
                className="w-full px-2.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="A"
                className="w-full px-2.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-4 bg-[#384959] hover:bg-[#273440] text-white font-bold text-xs rounded-xl shadow-md transition duration-150 disabled:opacity-50"
          >
            {loading ? "Registering Profile..." : "Submit Student Registration"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-[#6A89A7]">
          Already registered?{" "}
          <Link to="/student/login" className="text-[#384959] font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
