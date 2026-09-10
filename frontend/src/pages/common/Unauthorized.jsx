import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Unauthorized() {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin":
        return "/admin";
      case "teacher":
        return "/teacher";
      case "student":
        return "/student";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center px-4 text-center font-sans relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-soft-lg">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-[#384959] tracking-tight">Access Restricted</h1>
        <p className="text-xs text-[#6A89A7] mt-2 leading-relaxed">
          Your authenticated account role does not have security authorization to view this protected zone.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to={getDashboardPath()}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#384959] hover:bg-[#273440] text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#88BDF2]" />
            <span>Return to Authorized Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
