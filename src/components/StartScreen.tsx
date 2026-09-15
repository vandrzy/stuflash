'use client';

import React, { useState, useRef } from 'react';
import { DeckCategory, DifficultyLevel } from '../types/flashcard';
import { DECK_CATEGORIES } from '../data/flashcards';

interface StartScreenProps {
  onStartGame: (categoryId: string, difficulty: DifficultyLevel, materialBlob: Blob | null) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('science');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [materialBlob, setMaterialBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const blob = new Blob([file], { type: file.type || 'text/plain' });
      setMaterialBlob(blob);
    }
  };

  const handleStart = () => {
    if (selectedCategory === 'generate' && !uploadedFile) {
      alert('Please upload your study material file first to generate custom flashcards!');
      return;
    }
    onStartGame(selectedCategory, difficulty, materialBlob);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center text-center">
      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl font-black text-[#fbf8e0] tracking-tight drop-shadow-md mb-3">
        StuFlash
      </h1>
      <p className="text-base sm:text-lg text-[#fbf8e0]/90 max-w-xl font-medium mb-6 leading-relaxed drop-shadow-sm">
        Master knowledge through interactive flash cards. Choose a subject deck below and test your speed and accuracy!
      </p>

      {/* Category Deck Selection */}
      <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 shadow-xl mb-6">
        <h2 className="text-lg font-extrabold text-[#fbf8e0] mb-4 text-left flex items-center gap-2">
          <span>📚</span> Select Subject Deck:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DECK_CATEGORIES.map((cat: DeckCategory) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex flex-col items-start text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border-2 shadow-md ${isSelected
                  ? 'bg-[#518dff] border-white scale-[1.02] ring-4 ring-white/30 shadow-lg'
                  : 'bg-white/15 border-white/20 hover:bg-white/25 hover:border-white/40'
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-xs bg-white text-[#518dff] font-extrabold px-2 py-0.5 rounded-full shadow">
                    Active
                  </span>
                )}
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="text-base font-bold text-[#fbf8e0] mb-1">{cat.name}</h3>
                <p className="text-xs text-[#fbf8e0]/80 line-clamp-3 mb-2">{cat.description}</p>
                {cat.questionCount > 0 && (
                  <div className="text-xs font-semibold text-[#fbf8e0]/90 bg-black/15 px-2 py-0.5 rounded-lg mt-auto">
                    {cat.questionCount} Flash Cards
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Difficulty Level & Upload Material Section */}
        <div className="mt-5 pt-5 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Difficulty Level Input */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-[#fbf8e0] shrink-0">Difficulty:</span>
            <div className="flex items-center bg-black/20 p-1 rounded-xl border border-white/20">
              {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => {
                const isActive = difficulty === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${isActive
                      ? 'bg-[#518dff] text-[#fbf8e0] shadow-md border border-white/40'
                      : 'text-[#fbf8e0]/70 hover:text-[#fbf8e0]'
                      }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Upload Material Button (Only shown when Generate Flashcard deck is selected) */}
          {selectedCategory === 'generate' && (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.docx,.md"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-xs font-extrabold text-[#fbf8e0] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>📁</span> {uploadedFile ? 'Change Material' : 'Upload Material'}
              </button>

              {uploadedFile && (
                <span className="text-xs font-semibold text-[#fbf8e0] bg-black/20 px-2.5 py-1 rounded-lg border border-white/10 truncate max-w-[150px]">
                  {uploadedFile.name}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleStart}
        className="w-full sm:w-auto px-10 py-3.5 text-xl font-extrabold text-[#fbf8e0] bg-[#518dff] hover:bg-[#407be6] active:scale-95 rounded-2xl shadow-lg hover:shadow-white/20 transition-all duration-200 border-2 border-white/40 flex items-center justify-center gap-3 cursor-pointer"
      >
        Start Game Now
      </button>
    </div>
  );
};
