'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FlashcardQuestion, DifficultyLevel } from '../types/flashcard';
import { AnswerCardGroup } from './AnswerCardGroup';

interface QuestionViewProps {
  question: FlashcardQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  difficulty: DifficultyLevel;
  onAnswerSubmit: (selectedIndex: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  difficulty,
  onAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [phase, setPhase] = useState<'answering' | 'paused'>('answering');

  // Determine answering duration based on difficulty level
  const answeringDurationSeconds = difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20;
  const pauseDurationSeconds = 6;

  const [timeLeft, setTimeLeft] = useState<number>(answeringDurationSeconds);

  // References to keep track of timing accurately and avoid stale closures
  const phaseRef = useRef<'answering' | 'paused'>('answering');
  const isSubmittedRef = useRef<boolean>(false);
  const endTimeRef = useRef<number>(Date.now() + answeringDurationSeconds * 1000);

  // Synchronize state with refs
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  // Start 6-second pause timer after answer or timeout
  const startPauseTimer = () => {
    setPhase('paused');
    phaseRef.current = 'paused';
    endTimeRef.current = Date.now() + pauseDurationSeconds * 1000;
    setTimeLeft(pauseDurationSeconds);
  };

  // Main countdown timer effect
  useEffect(() => {
    endTimeRef.current = Date.now() + answeringDurationSeconds * 1000;
    setTimeLeft(answeringDurationSeconds);

    const interval = setInterval(() => {
      const remainingSeconds = Math.max(0, (endTimeRef.current - Date.now()) / 1000);
      setTimeLeft(remainingSeconds);

      if (remainingSeconds <= 0) {
        if (phaseRef.current === 'answering' && !isSubmittedRef.current) {
          // Timeout occurred before user answered
          setIsSubmitted(true);
          isSubmittedRef.current = true;
          setSelectedIndex(-1);
          onAnswerSubmit(-1);
          startPauseTimer();
        } else if (phaseRef.current === 'paused') {
          // Pause timer finished, proceed automatically to next question
          clearInterval(interval);
          onNextQuestion();
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [answeringDurationSeconds]);

  const handleSelectOption = (index: number) => {
    if (isSubmittedRef.current) return;
    setIsSubmitted(true);
    isSubmittedRef.current = true;
    setSelectedIndex(index);
    onAnswerSubmit(index);
    startPauseTimer();
  };

  const currentMaxDuration = phase === 'answering' ? answeringDurationSeconds : pauseDurationSeconds;
  const timerPercentage = Math.min(100, Math.max(0, (timeLeft / currentMaxDuration) * 100));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-md">
        <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#fbf8e0]">
          <span className="bg-white/20 px-3 py-1 rounded-xl shadow-sm">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-[#fbf8e0]">

          <span className="bg-white/20 px-3 py-1 rounded-xl">{score} pts</span>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full mb-6">
        <div className="w-full h-3.5 bg-black/25 rounded-full overflow-hidden border border-white/15 p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-75 shadow-md ${phase === 'answering'
              ? 'bg-gradient-to-r from-blue-300 via-[#518dff] to-emerald-400'
              : 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 animate-pulse'
              }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
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
    </div>
  );
};

