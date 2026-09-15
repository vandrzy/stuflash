'use client';

import React from 'react';

interface AnswerCardGroupProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  isSubmitted: boolean;
  onSelectOption: (index: number) => void;
}

export const AnswerCardGroup: React.FC<AnswerCardGroupProps> = ({
  options,
  selectedIndex,
  correctIndex,
  isSubmitted,
  onSelectOption,
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((optionText, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = index === correctIndex;

        // Color & Styling determination
        let cardBg = 'bg-[#518dff] hover:bg-[#407be6] hover:scale-[1.02] border-white/30';
        let statusBadgeClass = 'bg-white/20 text-[#fbf8e0]';
        let statusIcon = letters[index];
        let animationClass = '';

        if (isSubmitted) {
          if (isSelected && isCorrect) {
            // Correct choice made by user
            cardBg = 'bg-[#116b09] border-white ring-4 ring-green-300/40 shadow-xl';
            statusBadgeClass = 'bg-white text-[#116b09] font-black';
            statusIcon = '✓';
            animationClass = 'animate-pop';
          } else if (isSelected && !isCorrect) {
            // Wrong choice made by user
            cardBg = 'bg-[#c60707] border-white ring-4 ring-red-300/40 shadow-xl';
            statusBadgeClass = 'bg-white text-[#c60707] font-black';
            statusIcon = '✗';
            animationClass = 'animate-shake';
          } else if (!isSelected && isCorrect) {
            // Show correct answer even if user didn't pick it
            cardBg = 'bg-[#116b09]/90 border-white/80 ring-2 ring-white/50';
            statusBadgeClass = 'bg-white text-[#116b09] font-black';
            statusIcon = '✓';
          } else {
            // Other non-selected options during submitted state
            cardBg = 'bg-[#518dff]/40 border-white/10 opacity-50 cursor-not-allowed';
          }
        }

        return (
          <button
            key={index}
            type="button"
            disabled={isSubmitted}
            onClick={() => onSelectOption(index)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 shadow-lg cursor-pointer ${cardBg} ${animationClass}`}
          >
            {/* Option Letter / Status Indicator Badge */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-lg shadow-sm transition-transform ${statusBadgeClass}`}
            >
              {statusIcon}
            </div>

            {/* Option Text */}
            <span className="text-[#fbf8e0] font-bold text-base sm:text-lg leading-snug">
              {optionText}
            </span>
          </button>
        );
      })}
    </div>
  );
};
