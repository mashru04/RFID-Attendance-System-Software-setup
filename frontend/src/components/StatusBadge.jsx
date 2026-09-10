import React from "react";

export default function StatusBadge({ status }) {
  let badgeStyles = "bg-slate-100 text-slate-700 border-slate-200";

  switch (status?.toLowerCase()) {
    case "present":
      badgeStyles = "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm";
      break;
    case "late":
      badgeStyles = "bg-amber-50 text-amber-700 border-amber-200 shadow-sm";
      break;
    case "absent":
      badgeStyles = "bg-rose-50 text-rose-700 border-rose-200 shadow-sm";
      break;
    default:
      badgeStyles = "bg-slate-100 text-slate-600 border-slate-200";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles} transition-transform duration-150 hover:scale-105`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status?.toLowerCase() === "present"
            ? "bg-[#22C55E]"
            : status?.toLowerCase() === "late"
            ? "bg-[#F59E0B]"
            : status?.toLowerCase() === "absent"
            ? "bg-[#EF4444]"
            : "bg-slate-400"
        }`}
      />
      {status || "Unknown"}
    </span>
  );
}
