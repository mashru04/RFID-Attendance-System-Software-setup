import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  message = "No records found",
  description = "There is currently no data matching your request.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-[#BDDDFC] rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#BDDDFC]/30 border border-[#BDDDFC]/50 flex items-center justify-center text-[#6A89A7] mb-3">
        <FolderOpen className="w-7 h-7" />
      </div>
      <h3 className="text-sm font-bold text-[#384959]">{message}</h3>
      {description && (
        <p className="text-xs text-[#6A89A7] mt-1 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
