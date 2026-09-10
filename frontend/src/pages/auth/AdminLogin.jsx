import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ShieldCheck, ArrowLeft, AlertCircle, Lock, KeyRound } from "lucide-react";

export default function AdminLogin() {
  const [id, setId] = useState("admin");
  const [password, setPassword] = useState("admin");
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
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid admin credentials");
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
          <div className="p-3 rounded-2xl bg-[#384959] text-[#88BDF2] shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#384959]">System Administration</h2>
            <p className="text-xs text-[#6A89A7]">Authorized Personnel Console</p>
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
              Admin Identifier
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#88BDF2] focus:bg-white transition"
              />
              <KeyRound className="w-4 h-4 text-[#6A89A7] absolute left-3.5 top-3" />
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
              Default credentials: <strong>admin / admin</strong>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#273440] hover:bg-[#384959] text-white font-bold text-xs rounded-xl shadow-md transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Verifying Credentials..." : "Authenticate & Open Console"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[11px] text-[#6A89A7]">
          Restricted access. All access attempts are logged for security.
        </div>
      </div>
    </div>
  );
}
