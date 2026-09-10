import React, { useState, useEffect } from "react";
import { studentService } from "../../services/studentService";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../../components/react-bits/ProfileCard";
import Loader from "../../components/Loader";
import { ShieldCheck, Mail, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export default function MyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (user?.id) {
        try {
          const data = await studentService.getMyProfile(user.id);
          setProfile(data);
        } catch (err) {
          setProfile(user);
        } finally {
          setLoading(false);
        }
      }
    }
    loadProfile();
  }, [user]);

  if (loading) {
    return <Loader message="Loading student smart ID profile..." />;
  }

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-[#384959] tracking-tight">Student Smart ID & Profile</h1>
        <p className="text-xs text-[#6A89A7] mt-0.5">
          Interactive digital holographic badge linked to campus RFID readers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Holographic Profile Card (React Bits) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start">
          <ProfileCard
            name={profile?.name || user?.name || "Deep"}
            title={profile?.department || user?.department || "CSE"}
            handle={profile?.id || user?.id || "20230204064"}
            status="Active"
            cardId={profile?.cardId || user?.cardId || "03E59013"}
            semester={profile?.semester || "6th"}
            section={profile?.section || "A"}
          />
        </div>

        {/* Profile Attributes & Card Info */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-[#BDDDFC]/30 text-[#384959] border border-[#BDDDFC]">
              <ShieldCheck className="w-5 h-5 text-[#384959]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#384959]">Credential Verification</h2>
              <p className="text-xs text-[#6A89A7]">Hardware NFC/RFID pairing active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-[#6A89A7]">Email Address</p>
              <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#88BDF2]" />
                {profile?.email || `${profile?.id || "student"}@student.edu`}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-[#6A89A7]">Department</p>
              <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#88BDF2]" />
                {profile?.department || "CSE"} Engineering
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-[#6A89A7]">Semester & Section</p>
              <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#88BDF2]" />
                Semester {profile?.semester || "6th"} &bull; Section {profile?.section || "A"}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-[#6A89A7]">Pairing Status</p>
              <p className="font-semibold text-emerald-700 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Linked to RFID Scanner
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-[#BDDDFC]/50 text-xs text-[#384959] flex items-center justify-between">
            <span>Hardware UID:</span>
            <span className="font-mono font-bold text-sm text-[#384959] bg-white px-3 py-1 rounded-lg border border-slate-200">
              {profile?.cardId || "03E59013"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
