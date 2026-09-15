'use client';

import React, { useState } from 'react';
import { DeckCategory } from '../types/flashcard';
import { DECK_CATEGORIES } from '../data/flashcards';

interface StartScreenProps {
  onStartGame: (categoryId: string, shuffle: boolean) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-[#fbf8e0] font-bold text-sm shadow-md mb-6 animate-pulse">
        <span>✨</span> Interactive Learning Media
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl font-black text-[#fbf8e0] tracking-tight drop-shadow-md mb-4">
        StuFlash Game
      </h1>
      <p className="text-lg sm:text-xl text-[#fbf8e0]/90 max-w-xl font-medium mb-8 leading-relaxed drop-shadow-sm">
        Master knowledge through interactive flash cards. Choose a subject deck below and test your speed and accuracy!
      </p>

      {/* Category Deck Selection */}
      <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl mb-8">
        <h2 className="text-xl font-extrabold text-[#fbf8e0] mb-4 text-left flex items-center gap-2">
          <span>📚</span> Select Subject Deck:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DECK_CATEGORIES.map((cat: DeckCategory) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex flex-col items-start text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer border-2 shadow-md ${
                  isSelected
                    ? 'bg-[#518dff] border-white scale-[1.02] ring-4 ring-white/30 shadow-lg'
                    : 'bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-xs bg-white text-[#518dff] font-extrabold px-2.5 py-1 rounded-full shadow">
                    Active
                  </span>
                )}
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#fbf8e0] mb-1">{cat.name}</h3>
                <p className="text-xs text-[#fbf8e0]/80 line-clamp-2 mb-3">{cat.description}</p>
                <div className="text-xs font-semibold text-[#fbf8e0]/90 bg-black/15 px-2.5 py-1 rounded-lg">
                  {cat.questionCount} Flash Cards
                </div>
              </button>
            );
          })}
        </div>

        {/* Options Bar */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold text-[#fbf8e0]">
          <label className="flex items-center gap-2.5 cursor-pointer bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <input
              type="checkbox"
              checked={shuffleQuestions}
              onChange={(e) => setShuffleQuestions(e.target.checked)}
              className="w-4 h-4 accent-[#518dff] rounded cursor-pointer"
            />
            Shuffle Question Order
          </label>

          <span className="text-xs bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
            Target: Answer correctly to earn points!
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onStartGame(selectedCategory, shuffleQuestions)}
        className="w-full sm:w-auto px-10 py-4 text-xl font-extrabold text-[#fbf8e0] bg-[#518dff] hover:bg-[#407be6] active:scale-95 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-200 border-2 border-white/40 flex items-center justify-center gap-3 cursor-pointer"
      >
        <span>🚀</span> Start Game Now
      </button>
    </div>
  );
};
