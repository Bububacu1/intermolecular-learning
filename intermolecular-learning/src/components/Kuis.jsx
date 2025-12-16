import React, { useState, useEffect } from 'react';
import { Check, X, Lightbulb, ChevronLeft, ChevronRight, Clock, Target, SkipForward, Trophy, Star, AlertCircle } from 'lucide-react';

/* ===== SOAL TETAP (TIDAK DIUBAH) ===== */
const QUESTIONS = [ /* ISI QUESTIONS SAMA PERSIS SEPERTI PUNYA KAMU */ ];

/* ===== SCORING ===== */
const calculateScore = (answers) => {
  let correct = 0;
  QUESTIONS.forEach((q, i) => {
    const ans = answers[i];
    if (!ans || ans.skipped) return;
    if (q.type === 'multiple-choice' && ans.selected === q.correctAnswer) correct++;
    else if (q.type === 'true-false' && ans.selected === q.correctAnswer) correct++;
    else if (q.type === 'ordering') {
      const order = ans.order || [];
      correct += order.filter((v, idx) => v === q.correctOrder[idx]).length / q.correctOrder.length;
    } else if (q.type === 'matching') {
      const pairs = ans.pairs || {};
      correct += Object.values(pairs).filter((v, idx) => v === q.pairs[idx].right).length / q.pairs.length;
    } else if (q.type === 'case-study') {
      const parts = ans.parts || [];
      let c = 0;
      q.parts.forEach((part, idx) => {
        if (part.keywords.some(kw => (parts[idx] || '').toLowerCase().includes(kw.toLowerCase()))) c++;
      });
      correct += c / q.parts.length;
    }
  });
  return Math.round((correct / QUESTIONS.length) * 100);
};

/* =================================================
   HALAMAN KUIS (SESUAI App.jsx)
   ================================================= */
export default function Kuis({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [attempts, setAttempts] = useState(Array(QUESTIONS.length).fill(0));
  const [hintsUsed, setHintsUsed] = useState(Array(QUESTIONS.length).fill(0));
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [dragOrder, setDragOrder] = useState([]);
  const [matchPairs, setMatchPairs] = useState({});
  const [caseAnswers, setCaseAnswers] = useState([]);

  const q = QUESTIONS[current];
  const ans = answers[current];
  const hintLevel = hintsUsed[current];

  useEffect(() => {
    if (q.type === 'ordering') setDragOrder([...Array(q.items.length).keys()]);
    if (q.type === 'matching') setMatchPairs({});
    if (q.type === 'case-study') setCaseAnswers(Array(q.parts.length).fill(''));
    setFeedback(null);
    setShowHint(false);
  }, [current]);

  useEffect(() => {
    if (timer) {
      const int = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(int);
    }
  }, [timer]);

  const score = calculateScore(answers);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-900 text-white">

      {/* ===== SUMMARY ===== */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border-2 border-emerald-500">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Hasil Kuis</h2>
              <div className="text-5xl font-bold text-emerald-400 mb-4">{score}/100</div>

              <div className="flex gap-3">
                <button
                  onClick={() => onNavigate('simulasi')}
                  className="flex-1 py-3 bg-gray-700 rounded-lg font-semibold"
                >
                  Kembali ke Simulasi
                </button>
                <button
                  onClick={() => onNavigate('landing')}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-pink-500 rounded-lg font-semibold"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <span className="text-emerald-400 font-semibold">
            Kuis ({current + 1}/{QUESTIONS.length})
          </span>
          <button
            onClick={() => onNavigate('simulasi')}
            className="px-3 py-1 bg-gray-800 rounded text-sm"
          >
            <ChevronLeft className="inline w-4 h-4" /> Simulasi
          </button>
        </div>
      </header>

      {/* ===== ISI ===== */}
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">{q.question || q.statement}</h2>

        {/* (SELURUH LOGIKA SOAL, FEEDBACK, BUTTON NEXT/PREV TETAP SAMA) */}

        <div className="flex justify-end mt-8">
          {current === QUESTIONS.length - 1 ? (
            <button
              onClick={() => setShowSummary(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-pink-500 rounded-lg font-semibold"
            >
              Lihat Hasil
            </button>
          ) : (
            <button
              onClick={() => setCurrent(current + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-lg"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}