'use client';

import React, { useState } from 'react';
import { FlashcardQuestion } from '../types/flashcard';
import { AnswerCardGroup } from './AnswerCardGroup';

interface QuestionViewProps {
  question: FlashcardQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  onAnswerSubmit: (selectedIndex: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
    setIsSubmitted(true);
    onAnswerSubmit(index);
  };

  const isCorrect = selectedIndex !== null && selectedIndex === question.correctAnswerIndex;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-md">
        <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#fbf8e0]">
          <span className="bg-[#518dff] px-3 py-1 rounded-xl shadow-sm">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="capitalize text-xs bg-white/20 px-2.5 py-1 rounded-lg">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-[#fbf8e0]">
          <span>⭐ Score:</span>
          <span className="bg-white/20 px-3 py-1 rounded-xl">{score} pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden mb-6 border border-white/10 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-blue-300 via-[#518dff] to-emerald-400 rounded-full transition-all duration-300 shadow"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Flashcard Question Box */}
      <div className="w-full bg-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-white/30 shadow-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-xs uppercase font-extrabold tracking-widest text-[#fbf8e0]/80 mb-2">
          Flash Card Prompt
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-[#fbf8e0] leading-snug tracking-tight">
          {question.question}
        </h2>
      </div>

      {/* Answer Cards Grid */}
      <div className="w-full mb-6">
        <AnswerCardGroup
          options={question.options}
          selectedIndex={selectedIndex}
          correctIndex={question.correctAnswerIndex}
          isSubmitted={isSubmitted}
          onSelectOption={handleSelectOption}
        />
      </div>

      {/* Feedback & Explanation Box */}
      {isSubmitted && (
        <div
          className={`w-full rounded-2xl p-5 border-2 shadow-xl mb-6 backdrop-blur-md transition-all duration-300 ${
            isCorrect
              ? 'bg-[#116b09]/90 border-white text-[#fbf8e0]'
              : 'bg-[#c60707]/90 border-white text-[#fbf8e0]'
          }`}
        >
          <div className="flex items-center gap-3 font-black text-lg mb-2">
            <span className="text-2xl">{isCorrect ? '🎉 Correct!' : '❌ Incorrect'}</span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-[#fbf8e0]/95 leading-relaxed bg-black/15 p-3 rounded-xl border border-white/10">
            <strong>Explanation:</strong> {question.explanation}
          </p>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onNextQuestion}
              className="px-6 py-3 bg-white text-slate-900 font-extrabold text-base rounded-xl shadow-lg hover:bg-slate-100 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              {isLastQuestion ? 'View Results 🏆' : 'Next Question ➔'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
