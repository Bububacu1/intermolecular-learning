import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
  X,
  Zap,
  Droplets,
  Wind,
  Sparkles,
} from "lucide-react";

/* ================== DATA ================== */

const materiData = {
  pengantar: {
    definisi:
      "Gaya antarmolekul adalah gaya tarik-menarik atau tolak-menolak yang terjadi antara molekul-molekul. Berbeda dengan ikatan kimia yang mengikat atom dalam molekul, gaya antarmolekul bekerja antar molekul yang berbeda.",
    perbedaan: [
      { aspek: "Kekuatan", ikatan: "Kuat", antarmolekul: "Lebih lemah" },
      { aspek: "Jangkauan", ikatan: "Dalam molekul", antarmolekul: "Antar molekul" },
      { aspek: "Pengaruh", ikatan: "Identitas zat", antarmolekul: "Sifat fisik" },
    ],
  },
  jenisGaya: [
    {
      id: "london",
      nama: "Gaya London",
      definisi: "Gaya akibat dipol sesaat pada molekul.",
      kekuatan: 25,
      contoh: ["CH₄", "C₈H₁₈", "Gas mulia"],
      color: "#fbbf24",
    },
    {
      id: "dipol",
      nama: "Dipol-Dipol",
      definisi: "Interaksi antar molekul polar.",
      kekuatan: 50,
      contoh: ["HCl", "SO₂"],
      color: "#3b82f6",
    },
    {
      id: "hidrogen",
      nama: "Ikatan Hidrogen",
      definisi: "Interaksi kuat antara H dan F, O, atau N.",
      kekuatan: 90,
      contoh: ["H₂O", "NH₃"],
      color: "#f43f5e",
    },
  ],
};

/* ================== COMPONENT ================== */

export default function Materi({ onNavigate }) {
  const [open, setOpen] = useState(["pengantar"]);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    const handleScroll = () => {
      const p = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(p);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (id) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900 text-white">
      {/* HEADER */}
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur border-b border-emerald-500/20 z-50">
        <div className="max-w-7xl mx-auto p-4 flex justify-between">
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded"
          >
            <ChevronLeft size={18} /> Kembali
          </button>
          <button
            onClick={() => onNavigate("simulasi")}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-pink-500 px-4 py-2 rounded"
          >
            Simulasi <ChevronRight size={18} />
          </button>
        </div>
        <div className="h-1 bg-gray-800">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* CONTENT */}
      <main
        ref={contentRef}
        className="max-w-5xl mx-auto p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]"
      >
        {/* PENGANTAR */}
        <section className="bg-white/5 rounded-xl border border-emerald-500/20">
          <button
            onClick={() => toggle("pengantar")}
            className="w-full p-6 flex justify-between"
          >
            <h2 className="text-xl font-bold text-emerald-400">
              Pengantar Gaya Antarmolekul
            </h2>
            {open.includes("pengantar") ? <ChevronUp /> : <ChevronDown />}
          </button>
          {open.includes("pengantar") && (
            <div className="p-6 pt-0 space-y-4 text-gray-300">
              <p>{materiData.pengantar.definisi}</p>
            </div>
          )}
        </section>

        {/* JENIS GAYA */}
        <section className="bg-white/5 rounded-xl border border-emerald-500/20">
          <button
            onClick={() => toggle("jenis")}
            className="w-full p-6 flex justify-between"
          >
            <h2 className="text-xl font-bold text-emerald-400">
              Jenis Gaya Antarmolekul
            </h2>
            {open.includes("jenis") ? <ChevronUp /> : <ChevronDown />}
          </button>
          {open.includes("jenis") && (
            <div className="p-6 pt-0 space-y-4">
              {materiData.jenisGaya.map((g) => (
                <div
                  key={g.id}
                  className="p-4 rounded border-l-4"
                  style={{ borderColor: g.color }}
                >
                  <h3 className="font-bold" style={{ color: g.color }}>
                    {g.nama}
                  </h3>
                  <p className="text-sm text-gray-300">{g.definisi}</p>
                  <p className="text-sm text-gray-400">
                    Contoh: {g.contoh.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
