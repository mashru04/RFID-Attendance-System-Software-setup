import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LineSidebar.css";

export default function LineSidebar({ items = [], roleName = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isItemActive = (item) => {
    if (item.end) {
      return location.pathname === item.path;
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + "/");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <aside className="line-sidebar-container shrink-0">
      <div>
        {roleName && (
          <div className="px-3 pb-3 mb-2 border-b border-stormy-muted/20">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#88BDF2]">
              {roleName} Navigation
            </span>
          </div>
        )}
        <nav className="line-sidebar-nav">
          {items.map((item, index) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <div
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`line-sidebar-item ${active ? "active" : ""}`}
              >
                {active && <span className="line-sidebar-indicator" />}
                {Icon && (
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active ? "text-[#88BDF2]" : "text-[#BDDDFC]/80"
                    }`}
                  />
                )}
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="line-sidebar-footer">
        <p className="font-medium text-[#BDDDFC]/70">RFID Attendance v2.0</p>
        <p className="text-[10px] text-[#6A89A7] mt-0.5">Secure Terminal System</p>
      </div>
    </aside>
  );
}
