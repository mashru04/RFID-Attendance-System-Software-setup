import React from "react";
import Counter from "./react-bits/Counter";

export default function Card({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "sky",
  isCounter = true,
  suffix = "",
  prefix = "",
  children,
}) {
  const colorMap = {
    sky: {
      bg: "bg-white",
      iconBg: "bg-[#BDDDFC]/30 text-[#384959] border-[#BDDDFC]",
      accent: "text-[#384959]",
    },
    primary: {
      bg: "bg-white",
      iconBg: "bg-[#6A89A7]/15 text-[#384959] border-[#6A89A7]/30",
      accent: "text-[#384959]",
    },
    present: {
      bg: "bg-white",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      accent: "text-emerald-700",
    },
    late: {
      bg: "bg-white",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      accent: "text-amber-700",
    },
    absent: {
      bg: "bg-white",
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      accent: "text-rose-700",
    },
    dark: {
      bg: "bg-[#384959] text-white",
      iconBg: "bg-white/10 text-[#BDDDFC] border-white/15",
      accent: "text-[#BDDDFC]",
    },
  };

  const style = colorMap[color] || colorMap.sky;
  const isNumeric = typeof value === "number" || (!isNaN(parseFloat(value)) && isFinite(value));

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 p-5 shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5 ${style.bg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {title && (
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A89A7]">
              {title}
            </p>
          )}
          <div className="text-2xl font-extrabold tracking-tight text-[#384959]">
            {isCounter && isNumeric ? (
              <Counter value={value} prefix={prefix} suffix={suffix} />
            ) : (
              <span>
                {prefix}
                {value}
                {suffix}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#6A89A7] flex items-center gap-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border shrink-0 ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {children && <div className="mt-4 pt-3 border-t border-slate-100">{children}</div>}
    </div>
  );
}
