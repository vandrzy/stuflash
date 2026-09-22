'use client';

import React from 'react';
import { GameSummary } from '../types/flashcard';

interface ScoreScreenProps {
  summary: GameSummary;
  onRestart: () => void;
  onChangeDeck: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ summary, onRestart, onChangeDeck }) => {
  // Evaluation text & icon based on accuracy
  let evalTitle = "Keep Learning!";
  let evalSubtitle = "Don't give up and try again.";
  let evalBadge = "💪";

  if (summary.accuracyPercentage >= 90) {
    evalTitle = "Mastermind Performance!";
    evalSubtitle = "Perfect mastery of this topic.";
    evalBadge = "🏆";
  } else if (summary.accuracyPercentage >= 70) {
    evalTitle = "Great Job!";
    evalSubtitle = "You have a solid understanding.";
    evalBadge = "🌟";
  } else if (summary.accuracyPercentage >= 50) {
    evalTitle = "Good Progress!";
    evalSubtitle = "Keep practicing to improve.";
    evalBadge = "🎯";
  }

  // SVG Gauge Calculations (Semi-circle Arc)
  const radius = 75;
  const center = 100;
  const circumference = Math.PI * radius; // ~235.62
  const strokeDashoffset = circumference - (summary.accuracyPercentage / 100) * circumference;

  // Calculate knob position along the arc
  const angleInRad = Math.PI - (summary.accuracyPercentage / 100) * Math.PI;
  const knobX = center + radius * Math.cos(angleInRad);
  const knobY = center - radius * Math.sin(angleInRad);

  // Gradient selection for Arc Meter
  let gradientId = 'gauge-emerald';
  let strokeStart = '#34d399';
  let strokeEnd = '#10b981';

  if (summary.accuracyPercentage < 50) {
    gradientId = 'gauge-rose';
    strokeStart = '#f87171';
    strokeEnd = '#e11d48';
  } else if (summary.accuracyPercentage < 70) {
    gradientId = 'gauge-amber';
    strokeStart = '#fbbf24';
    strokeEnd = '#d97706';
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
      {/* 
        ====================================================
        LAYAR PERTAMA (TOP SCREEN): GAUGE METER & BADGES
        Full-viewport focused area for initial view
        ====================================================
      */}
      <section className="w-full min-h-[100vh] flex flex-col justify-center items-center py-6 text-center">
        {/* Top Evaluation Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-[#fbf8e0] font-extrabold text-sm shadow-md mb-3">
          <span>{evalBadge}</span> {evalTitle}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#fbf8e0] tracking-tight mb-1 drop-shadow-md">
          {summary.deckCategory}
        </h1>
        <p className="text-sm sm:text-base text-[#fbf8e0]/80 mb-6 font-medium max-w-md">
          {evalSubtitle}
        </p>

        {/* Radial Gauge Meter Container */}
        <div className="relative w-64 h-40 sm:w-72 sm:h-44 flex flex-col items-center justify-end mb-6">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={strokeStart} />
                <stop offset="100%" stopColor={strokeEnd} />
              </linearGradient>
            </defs>

            {/* Background Arc Track */}
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Dynamic Progress Fill Arc */}
            <path
              d="M 25 100 A 75 75 0 0 1 175 100"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />

            {/* Knob Indicator Dot */}
            <circle
              cx={knobX}
              cy={knobY}
              r="7"
              fill="#ffffff"
              stroke={strokeEnd}
              strokeWidth="3"
              className="transition-all duration-1000 ease-out drop-shadow-lg"
            />
          </svg>

          {/* Center Content (Inside Arc) */}
          <div className="absolute bottom-2 flex flex-col items-center pointer-events-none">
            <span className="text-4xl sm:text-5xl font-black text-[#fbf8e0] tracking-tight leading-none drop-shadow-lg">
              {summary.accuracyPercentage}%
            </span>
            <span className="text-xs uppercase font-extrabold text-[#fbf8e0]/80 tracking-widest mt-1">
              Accuracy Score
            </span>
          </div>
        </div>

        {/* Three Stats Badges Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mb-6">
          {/* Badge 1: Correct */}
          <div className="bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-300/40 flex items-center justify-center font-bold text-sm sm:text-base mb-1.5 shadow-inner">
              ✓
            </div>
            <span className="text-[10px] sm:text-xs uppercase font-black text-emerald-300 tracking-wider mb-0.5">
              CORRECT
            </span>
            <span className="text-base sm:text-xl font-black text-[#fbf8e0]">
              {summary.correctCount} <span className="text-xs font-semibold opacity-80">correct</span>
            </span>
          </div>

          {/* Badge 2: Incorrect */}
          <div className="bg-rose-500/20 border border-rose-400/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500/30 text-rose-200 border border-rose-300/40 flex items-center justify-center font-bold text-sm sm:text-base mb-1.5 shadow-inner">
              ✕
            </div>
            <span className="text-[10px] sm:text-xs uppercase font-black text-rose-300 tracking-wider mb-0.5">
              INCORRECT
            </span>
            <span className="text-base sm:text-xl font-black text-[#fbf8e0]">
              {summary.wrongCount} <span className="text-xs font-semibold opacity-80">incorrect</span>
            </span>
          </div>

          {/* Badge 3: Streak */}
          <div className="bg-amber-500/20 border border-amber-400/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/30 text-amber-200 border border-amber-300/40 flex items-center justify-center font-bold text-sm sm:text-base mb-1.5 shadow-inner">
              🔥
            </div>
            <span className="text-[10px] sm:text-xs uppercase font-black text-amber-300 tracking-wider mb-0.5">
              MAX STREAK
            </span>
            <span className="text-base sm:text-xl font-black text-[#fbf8e0]">
              {summary.maxStreak} <span className="text-xs font-semibold opacity-80">streak</span>
            </span>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="animate-bounce flex flex-col items-center gap-1 text-xs font-extrabold text-[#fbf8e0]/70">
          <span>Scroll to review answers & actions</span>
          <span>↓</span>
        </div>
      </section>

      {/* 
        ====================================================
        LAYAR KEDUA (BOTTOM SCREEN): ACTIONS & ANSWER REVIEW
        Accessible by scrolling down
        ====================================================
      */}
      <section className="w-full pt-4 pb-12 flex flex-col items-center">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-8 max-w-lg">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 py-4 px-6 text-base sm:text-lg font-extrabold text-[#fbf8e0] bg-[#518dff] hover:bg-[#407be6] active:scale-95 rounded-2xl shadow-xl border-2 border-white/40 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🔄</span> Play Again
          </button>

          <button
            type="button"
            onClick={onChangeDeck}
            className="flex-1 py-4 px-6 text-base sm:text-lg font-extrabold text-[#fbf8e0] bg-white/20 hover:bg-white/30 active:scale-95 rounded-2xl shadow-xl border-2 border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>📚</span> Choose Different Deck
          </button>
        </div>

        {/* Detailed Answer Review Panel (Directly Visible) */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/20">
            <h2 className="font-black text-xl sm:text-2xl text-[#fbf8e0] flex items-center gap-2 tracking-tight">
              <span>📝</span> Answer Review ({summary.answers.length} Questions)
            </h2>
          </div>

          <div className="space-y-4">
            {summary.answers.map((answer, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${answer.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/50'
                    : 'bg-rose-950/40 border-rose-500/50'
                  }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="font-extrabold text-sm sm:text-base text-[#fbf8e0]">
                    Q{idx + 1}. {answer.question}
                  </span>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${answer.isCorrect
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-rose-500 text-white shadow-md'
                      }`}
                  >
                    {answer.isCorrect ? '✓ Correct' : '✕ Wrong'}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-semibold space-y-1.5 mb-3 text-[#fbf8e0]">
                  <div>
                    <span className="opacity-75">Your Choice:</span>{' '}
                    <span className="font-bold underline decoration-2">{answer.selectedOptionText}</span>
                  </div>

                  {!answer.isCorrect && (
                    <div>
                      <span className="opacity-75">Correct Answer:</span>{' '}
                      <span className="font-bold text-emerald-300">{answer.correctOptionText}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs font-medium text-[#fbf8e0]/90 bg-black/30 p-3 rounded-xl border border-white/10">
                  <strong className="text-[#fbf8e0] opacity-90">Explanation:</strong> {answer.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
