import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ message = "Loading data...", skeleton = false }) {
  if (skeleton) {
    return (
      <div className="w-full space-y-4 animate-pulse py-6">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-24 bg-slate-200 rounded-xl"></div>
          <div className="h-24 bg-slate-200 rounded-xl"></div>
          <div className="h-24 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="h-48 bg-slate-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-[#6A89A7]">
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#BDDDFC] border-t-[#88BDF2] animate-spin" />
        <Loader2 className="w-5 h-5 absolute text-[#384959] animate-pulse" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-[#384959]">
        {message}
      </span>
    </div>
  );
}
