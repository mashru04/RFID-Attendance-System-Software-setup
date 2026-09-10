import React from "react";
import EmptyState from "./EmptyState";

export default function Table({
  columns = [],
  data = [],
  keyField = "id",
  emptyMessage = "No records found",
}) {
  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-soft">
      <div className="overflow-x-auto max-h-[600px] relative">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-[#384959] text-white sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#BDDDFC] ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row, rowIdx) => (
              <tr
                key={row[keyField] || rowIdx}
                className="hover:bg-[#F4F7FB] transition-colors duration-150 group"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-5 py-3.5 whitespace-nowrap text-slate-700 text-xs font-medium ${
                      col.cellClassName || ""
                    }`}
                  >
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
