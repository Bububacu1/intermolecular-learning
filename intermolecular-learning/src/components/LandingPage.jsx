import React, { useState } from 'react';
import { BookOpen, Atom, Brain, Trophy, Droplets, Snowflake, Flame, ChevronRight, Zap } from 'lucide-react';

const LandingPage = ({ onNavigate = () => {} }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const learningObjectives = [
    { icon: Atom, text: "Memahami konsep dasar gaya antarmolekul dan perbedaannya dengan ikatan kimia" },
    { icon: Zap, text: "Mengidentifikasi jenis-jenis gaya antarmolekul (dipol-dipol, London, ikatan hidrogen)" },
    { icon: Droplets, text: "Menganalisis kekuatan relatif antar gaya antarmolekul" },
    { icon: Snowflake, text: "Menghubungkan gaya antarmolekul dengan sifat fisik zat" },
    { icon: Brain, text: "Memprediksi sifat fisik berdasarkan struktur molekul" }
  ];

  const modules = [
    {
      id: 'materi',
      title: 'Materi Pembelajaran',
      description: 'Konsep gaya antarmolekul secara visual dan konseptual',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      bgPattern: 'bg-emerald-500/10'
    },
    {
      id: 'simulasi',
      title: 'Simulasi Interaktif',
      description: 'Eksplorasi visual interaksi molekul',
      icon: Atom,
      color: 'from-pink-500 to-rose-600',
      bgPattern: 'bg-pink-500/10'
    },
    {
      id: 'kuis',
      title: 'Latihan & Kuis',
      description: 'Latihan bertahap dan evaluasi akhir',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      bgPattern: 'bg-yellow-400/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-pink-400 bg-clip-text text-transparent">
          Gaya Antarmolekul
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Pelajari bagaimana gaya antarmolekul menentukan sifat fisik zat di sekitar kita
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition hover:scale-105"
              >
                <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-gray-400">{m.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;