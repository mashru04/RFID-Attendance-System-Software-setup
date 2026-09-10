import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { CreditCard, CheckCircle2, Wifi } from "lucide-react";

export default function ManageCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await adminService.getCards();
        setCards(data);
      } catch (err) {
        console.error("Failed to load cards", err);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  const columns = [
    {
      header: "RFID Card UID",
      render: (row) => (
        <span className="font-mono text-xs font-bold bg-[#384959] text-[#BDDDFC] px-3 py-1.5 rounded-lg border border-white/10 shadow-sm tracking-wider">
          {row.cardId}
        </span>
      ),
    },
    {
      header: "Linked Student ID",
      render: (row) => <span className="font-mono font-bold text-slate-800">{row.studentId}</span>,
    },
    {
      header: "Student Name",
      render: (row) => <span className="font-semibold text-[#384959]">{row.studentName}</span>,
    },
    {
      header: "Transponder Status",
      render: () => (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active & Paired
        </span>
      ),
    },
  ];

  if (loading) {
    return <Loader message="Reading physical RFID card UID registry..." />;
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#384959] tracking-tight">RFID Hardware Card Registry</h1>
          <p className="text-xs text-[#6A89A7] mt-0.5">
            Physical 13.56MHz RFID / NFC transponder identification mapping to student accounts
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#384959] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-soft">
          <CreditCard className="w-4 h-4 text-[#88BDF2]" />
          <span>Active Paired Badges: <strong className="text-slate-900">{cards.length}</strong></span>
        </div>
      </div>

      <Table
        columns={columns}
        data={cards}
        emptyMessage="No hardware RFID cards mapped in registry."
      />
    </div>
  );
}
