import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-center items-center px-4 text-center font-sans relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-soft-lg">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-[#384959] tracking-tight">404 - Page Not Found</h1>
        <p className="text-xs text-[#6A89A7] mt-2 leading-relaxed">
          The destination or URL path you attempted to reach does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-[#384959] hover:bg-[#273440] text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          <Home className="w-4 h-4 text-[#88BDF2]" />
          <span>Return to Role Portal</span>
        </Link>
      </div>
    </div>
  );
}
