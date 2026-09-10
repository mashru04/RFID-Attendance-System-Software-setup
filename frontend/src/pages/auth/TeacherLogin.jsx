import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Briefcase, ArrowLeft, AlertCircle, Lock, User } from "lucide-react";

export default function TeacherLogin() {
  const [id, setId] = useState("T-101");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(id, password);
      navigate("/teacher");
    } catch (err) {
      setError(err.message || "Invalid teacher credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center px-4 py-12 relative font-sans">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#BDDDFC]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-soft-lg p-8 sm:p-10">
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-[#6A89A7] hover:text-[#384959] mb-6 gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Selection
        </Link>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-[#6A89A7]/20 text-[#384959] border border-[#6A89A7]/30 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#384959]">Faculty Login</h2>
            <p className="text-xs text-[#6A89A7]">Sign in with Teacher ID & Password</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1.5">
              Teacher ID
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="e.g. T-101"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
              />
              <User className="w-4 h-4 text-[#6A89A7] absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6A89A7] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
              />
              <Lock className="w-4 h-4 text-[#6A89A7] absolute left-3.5 top-3" />
            </div>
            <p className="text-[10px] text-[#6A89A7] mt-1 text-right">
              Default password: <strong>1234</strong>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#384959] hover:bg-[#273440] text-white font-bold text-xs rounded-xl shadow-md transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Sign In to Faculty Portal"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-[#6A89A7]">
          New faculty member?{" "}
          <Link to="/teacher/register" className="text-[#384959] font-bold hover:underline">
            Register profile
          </Link>
        </div>
      </div>
    </div>
  );
}
