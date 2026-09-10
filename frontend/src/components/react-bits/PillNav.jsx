import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./PillNav.css";

/**
 * PillNav — animated pill navigation.
 *
 * Color props (pass explicitly per usage site):
 *   baseColor        – wrapper background         (default: rgba(56,73,89,0.85))
 *   baseBorder       – wrapper border              (default: rgba(136,189,242,0.25))
 *   pillColor        – glider pill gradient start   (default: #BDDDFC)
 *   pillColorEnd     – glider pill gradient end     (default: #88BDF2)
 *   pillTextColor    – text color for default items (default: #BDDDFC)
 *   activeTextColor  – text on the active/hovered pill (default: #384959)
 *   hoverTextColor   – text for non-glider items on hover (default: #FFFFFF)
 */
export default function PillNav({
  items = [],
  className = "",
  baseColor = "rgba(56, 73, 89, 0.85)",
  baseBorder = "rgba(136, 189, 242, 0.25)",
  pillColor = "#BDDDFC",
  pillColorEnd = "#88BDF2",
  pillTextColor = "#BDDDFC",
  activeTextColor = "#384959",
  hoverTextColor = "#FFFFFF",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const navListRef = useRef(null);
  const gliderRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const activeIndex = items.findIndex(
    (item) =>
      item.path === location.pathname ||
      (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  // The glider sits under the active item (or the first item)
  const gliderIdx = hoveredIdx !== null ? hoveredIdx : (activeIndex !== -1 ? activeIndex : 0);

  useEffect(() => {
    if (!navListRef.current || !gliderRef.current) return;

    const listItems = navListRef.current.children;
    const currentIdx = activeIndex !== -1 ? activeIndex : 0;
    const currentElem = listItems[currentIdx];

    if (currentElem) {
      const { offsetLeft, offsetWidth, offsetHeight } = currentElem;
      gsap.to(gliderRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [activeIndex, location.pathname]);

  const handleMouseEnter = (e, idx) => {
    setHoveredIdx(idx);
    if (!gliderRef.current) return;
    const { offsetLeft, offsetWidth, offsetHeight } = e.currentTarget;
    gsap.to(gliderRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      height: offsetHeight,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    if (!navListRef.current || !gliderRef.current) return;
    const currentIdx = activeIndex !== -1 ? activeIndex : 0;
    const currentElem = navListRef.current.children[currentIdx];
    if (currentElem) {
      const { offsetLeft, offsetWidth, offsetHeight } = currentElem;
      gsap.to(gliderRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Determine text color for each item:
  //   - If the glider is on this item (active or hovered) → activeTextColor
  //   - Otherwise → pillTextColor (default resting color)
  const getTextColor = (idx) => {
    const isUnderGlider = idx === gliderIdx;
    return isUnderGlider ? activeTextColor : pillTextColor;
  };

  return (
    <nav
      className={`pill-nav-wrapper ${className}`}
      style={{
        background: baseColor,
        border: `1px solid ${baseBorder}`,
        boxShadow: "0 8px 24px -4px rgba(39, 52, 64, 0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        ref={gliderRef}
        className="pill-nav-glider"
        style={{
          background: `linear-gradient(135deg, ${pillColor} 0%, ${pillColorEnd} 100%)`,
          boxShadow: `0 2px 10px ${pillColor}80`,
        }}
      />
      <ul ref={navListRef} className="pill-nav-list" onMouseLeave={handleMouseLeave}>
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const Icon = item.icon;

          return (
            <li
              key={idx}
              className="pill-nav-item"
              onMouseEnter={(e) => handleMouseEnter(e, idx)}
              onClick={() => navigate(item.path)}
            >
              <span
                className={`pill-nav-link ${isActive ? "active" : ""}`}
                style={{ color: getTextColor(idx) }}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
