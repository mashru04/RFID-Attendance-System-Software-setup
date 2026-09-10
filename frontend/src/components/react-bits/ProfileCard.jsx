import React, { useRef, useState } from "react";
import { CreditCard, CheckCircle, Wifi } from "lucide-react";
import "./ProfileCard.css";

export default function ProfileCard({
  name = "Student Name",
  title = "Department",
  handle = "20230204064",
  status = "Active",
  cardId = "03E59013",
  semester = "6th",
  section = "A",
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <div className="profile-card-container">
      <div
        ref={cardRef}
        className="profile-card-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div
          className="profile-card-shine"
          style={{
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(189, 221, 252, 0.28) 0%, transparent 65%)`,
          }}
        />

        {/* Top Header of Smart ID Card */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#BDDDFC]">
              Smart Student Badge
            </span>
            <Wifi className="w-3.5 h-3.5 text-[#88BDF2] rotate-90" />
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" /> {status}
          </span>
        </div>

        {/* Card RFID Chip and Avatar */}
        <div className="flex items-center justify-between mb-6">
          <div className="profile-card-chip" />
          <div className="profile-card-avatar">
            {name ? name.charAt(0).toUpperCase() : "S"}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-1 mb-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">{name}</h3>
          <p className="text-sm font-medium text-[#88BDF2]">{title} Department</p>
          <p className="text-xs font-mono text-[#BDDDFC]/80">ID: {handle}</p>
        </div>

        {/* Card Footer Details */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <p className="text-[10px] text-[#6A89A7] uppercase tracking-wider">Class Enrolled</p>
            <p className="font-semibold text-[#BDDDFC]">Sem {semester} &bull; Sec {section}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#6A89A7] uppercase tracking-wider flex items-center justify-end gap-1">
              <CreditCard className="w-3 h-3" /> RFID UID
            </p>
            <p className="font-mono font-semibold text-white tracking-widest bg-white/10 px-2 py-0.5 rounded">
              {cardId || "UNLINKED"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
