import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ================= DATA MOLEKUL ================= */
const MOLECULAR_DATA = {
  london: {
    label: "London",
    mass: 40,
    color: "#fbbf24",
    radius: 12,
  },
  dipol: {
    label: "Dipol-Dipol",
    mass: 36.5,
    color: "#3b82f6",
    radius: 10,
  },
  hidrogen: {
    label: "Ikatan Hidrogen",
    mass: 18,
    color: "#f43f5e",
    radius: 8,
  },
};

/* ================= PARTICLE ================= */
class Particle {
  constructor(x, y, vx, vy, type, w, h) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.radius = MOLECULAR_DATA[type].radius;
    this.color = MOLECULAR_DATA[type].color;
  }

  update(speed) {
    this.x += this.vx * speed;
    this.y += this.vy * speed;

    if (this.x <= this.radius || this.x >= this.w - this.radius)
      this.vx *= -1;
    if (this.y <= this.radius || this.y >= this.h - this.radius)
      this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/* ================= SIMULASI ================= */
export default function Simulasi({ onNavigate }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const [bondType, setBondType] = useState("dipol");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [jumlah, setJumlah] = useState(20);

  /* ===== INIT PARTIKEL (INI KUNCI) ===== */
  const initParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = [];

    for (let i = 0; i < jumlah; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = 1 + Math.random() * 1.5;

      particlesRef.current.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.cos(angle) * v,
          Math.sin(angle) * v,
          bondType,
          canvas.width,
          canvas.height
        )
      );
    }
  };

  /* ===== ANIMASI ===== */
  const animate = () => {
    if (!isRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      p.update(speed);
      p.draw(ctx);
    });

    animRef.current = requestAnimationFrame(animate);
  };

  /* ===== START / STOP ===== */
  useEffect(() => {
    if (isRunning) {
      animate();
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, speed]);

  /* ===== RESET SAAT GANTI JENIS ===== */
  useEffect(() => {
    initParticles();
  }, [bondType, jumlah]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      {/* NAV */}
      <div className="flex justify-between mb-4">
        <button onClick={() => onNavigate("materi")} className="flex gap-1">
          <ChevronLeft /> Materi
        </button>
        <button onClick={() => onNavigate("kuis")} className="flex gap-1">
          Kuis <ChevronRight />
        </button>
      </div>

      {/* KONTROL */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <button
          onClick={() => {
            initParticles(); // 🔥 WAJIB
            setIsRunning(true);
          }}
          className="bg-green-600 px-3 py-1 rounded flex gap-1"
        >
          <Play size={16} /> Play
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="bg-red-600 px-3 py-1 rounded flex gap-1"
        >
          <Pause size={16} /> Pause
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            initParticles();
          }}
          className="bg-yellow-600 px-3 py-1 rounded flex gap-1"
        >
          <RotateCcw size={16} /> Reset
        </button>

        <select
          value={bondType}
          onChange={(e) => setBondType(e.target.value)}
          className="bg-slate-800 px-2 py-1 rounded"
        >
          <option value="london">London</option>
          <option value="dipol">Dipol-Dipol</option>
          <option value="hidrogen">Ikatan Hidrogen</option>
        </select>
      </div>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="bg-black rounded border border-slate-700"
      />
    </div>
  );
}