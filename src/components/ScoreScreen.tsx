'use client';

import React, { useState } from 'react';
import { GameSummary } from '../types/flashcard';

interface ScoreScreenProps {
  summary: GameSummary;
  onRestart: () => void;
  onChangeDeck: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ summary, onRestart, onChangeDeck }) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // Performance grade message
  let gradeTitle = 'Great Effort!';
  let gradeBadge = '⭐';
  if (summary.accuracyPercentage >= 90) {
    gradeTitle = 'Mastermind Performance!';
    gradeBadge = '🏆';
  } else if (summary.accuracyPercentage >= 70) {
    gradeTitle = 'Impressive Score!';
    gradeBadge = '🌟';
  } else if (summary.accuracyPercentage >= 50) {
    gradeTitle = 'Good Progress!';
    gradeBadge = '🎯';
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-[#fbf8e0] font-extrabold text-sm shadow-md mb-6">
        <span>{gradeBadge}</span> Game Complete!
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-[#fbf8e0] tracking-tight mb-2 drop-shadow-md text-center">
        {gradeTitle}
      </h1>
      <p className="text-base sm:text-lg text-[#fbf8e0]/90 mb-8 text-center font-medium">
        Here is how you performed on the <strong>{summary.deckCategory}</strong> deck:
      </p>

      {/* Main Score Card */}
      <div className="w-full bg-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-white/30 shadow-2xl mb-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Giant Score Circle */}
        <div className="w-36 h-36 rounded-full bg-[#518dff] border-4 border-white shadow-xl flex flex-col items-center justify-center mb-6 transform hover:scale-105 transition-transform">
          <span className="text-4xl font-black text-[#fbf8e0]">{summary.accuracyPercentage}%</span>
          <span className="text-xs uppercase font-extrabold text-[#fbf8e0]/90 tracking-wider">Accuracy</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          <div className="bg-[#116b09]/80 p-4 rounded-2xl border border-white/30 flex flex-col items-center shadow-md">
            <span className="text-xs uppercase font-extrabold text-[#fbf8e0]/90 mb-1">Correct</span>
            <span className="text-2xl font-black text-[#fbf8e0]">{summary.correctCount} / {summary.totalQuestions}</span>
          </div>

          <div className="bg-[#c60707]/80 p-4 rounded-2xl border border-white/30 flex flex-col items-center shadow-md">
            <span className="text-xs uppercase font-extrabold text-[#fbf8e0]/90 mb-1">Incorrect</span>
            <span className="text-2xl font-black text-[#fbf8e0]">{summary.wrongCount}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 py-4 px-6 text-lg font-extrabold text-[#fbf8e0] bg-[#518dff] hover:bg-[#407be6] active:scale-95 rounded-2xl shadow-xl border-2 border-white/40 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🔄</span> Play Again
        </button>

        <button
          type="button"
          onClick={onChangeDeck}
          className="flex-1 py-4 px-6 text-lg font-extrabold text-[#fbf8e0] bg-white/20 hover:bg-white/30 active:scale-95 rounded-2xl shadow-xl border-2 border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>📚</span> Choose Different Deck
        </button>
      </div>

      {/* Detailed Question Review Accordion */}
      <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between font-extrabold text-lg text-[#fbf8e0] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>📝</span> Detailed Answer Review ({summary.answers.length} Questions)
          </span>
          <span className="text-xl bg-white/10 w-8 h-8 rounded-xl flex items-center justify-center">
            {showDetails ? '▲' : '▼'}
          </span>
        </button>

        {showDetails && (
          <div className="mt-6 space-y-4">
            {summary.answers.map((answer, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  answer.isCorrect
                    ? 'bg-[#116b09]/80 border-white/40'
                    : 'bg-[#c60707]/80 border-white/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-extrabold text-sm text-[#fbf8e0]">
                    Q{idx + 1}. {answer.question}
                  </span>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                      answer.isCorrect ? 'bg-white text-[#116b09]' : 'bg-white text-[#c60707]'
                    }`}
                  >
                    {answer.isCorrect ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-semibold space-y-1 mb-3 text-[#fbf8e0]">
                  <div>
                    <span className="opacity-80">Your Choice:</span>{' '}
                    <span className="font-bold underline">{answer.selectedOptionText}</span>
                  </div>

                  {!answer.isCorrect && (
                    <div>
                      <span className="opacity-80">Correct Answer:</span>{' '}
                      <span className="font-bold text-green-200">{answer.correctOptionText}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs font-medium text-[#fbf8e0]/90 bg-black/20 p-2.5 rounded-xl">
                  <strong>Explanation:</strong> {answer.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
