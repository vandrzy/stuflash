'use client';

import React, { useState } from 'react';
import { GameScreenState, FlashcardQuestion, UserAnswerRecord, GameSummary } from '../types/flashcard';
import { DECK_CATEGORIES, FLASHCARD_QUESTIONS } from '../data/flashcards';
import { StartScreen } from '../components/StartScreen';
import { QuestionView } from '../components/QuestionView';
import { ScoreScreen } from '../components/ScoreScreen';

export default function Home() {
  const [screenState, setScreenState] = useState<GameScreenState>('start');
  const [activeDeckCategory, setActiveDeckCategory] = useState<string>('all');
  const [activeQuestions, setActiveQuestions] = useState<FlashcardQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);

  // Start game handler
  const handleStartGame = (categoryId: string, shuffle: boolean) => {
    setActiveDeckCategory(categoryId);

    // Filter questions by deck category
    let filtered = FLASHCARD_QUESTIONS;
    if (categoryId !== 'all') {
      filtered = FLASHCARD_QUESTIONS.filter((q) => q.category === categoryId);
    }

    // Clone array
    let selected = [...filtered];

    // Shuffle if requested
    if (shuffle) {
      selected = selected.sort(() => Math.random() - 0.5);
    }

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setGameSummary(null);
    setScreenState('playing');
  };

  // Answer submit handler for current question
  const handleAnswerSubmit = (selectedIndex: number) => {
    const currentQ = activeQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.correctAnswerIndex;

    const pointsEarned = isCorrect ? 100 : 0;
    setScore((prev) => prev + pointsEarned);

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      question: currentQ.question,
      selectedOptionIndex: selectedIndex,
      selectedOptionText: currentQ.options[selectedIndex],
      correctOptionIndex: currentQ.correctAnswerIndex,
      correctOptionText: currentQ.options[currentQ.correctAnswerIndex],
      isCorrect,
      explanation: currentQ.explanation,
    };

    setUserAnswers((prev) => [...prev, record]);
  };

  // Next question navigation or finish game
  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Complete game & calculate summary
      const total = activeQuestions.length;
      const correctCount = userAnswers.filter((a) => a.isCorrect).length;
      const wrongCount = total - correctCount;
      const accuracyPercentage = Math.round((correctCount / total) * 100);

      const categoryObj = DECK_CATEGORIES.find((c) => c.id === activeDeckCategory);
      const deckName = categoryObj ? categoryObj.name : 'Custom Deck';

      const summary: GameSummary = {
        deckCategory: deckName,
        score: score,
        totalQuestions: total,
        correctCount,
        wrongCount,
        accuracyPercentage,
        answers: userAnswers,
      };

      setGameSummary(summary);
      setScreenState('score');
    }
  };

  const handleRestartCurrentDeck = () => {
    handleStartGame(activeDeckCategory, true);
  };

  const handleChangeDeck = () => {
    setScreenState('start');
  };

  return (
    <main className="min-h-screen flex flex-col justify-between py-6 px-4 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full my-auto">
        {screenState === 'start' && <StartScreen onStartGame={handleStartGame} />}

        {screenState === 'playing' && activeQuestions.length > 0 && (
          <QuestionView
            key={currentQuestionIndex}
            question={activeQuestions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            score={score}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === activeQuestions.length - 1}
          />
        )}

        {screenState === 'score' && gameSummary && (
          <ScoreScreen
            summary={gameSummary}
            onRestart={handleRestartCurrentDeck}
            onChangeDeck={handleChangeDeck}
          />
        )}
      </div>

      {/* Footer Branding */}
      <footer className="relative z-10 text-center py-4 text-xs font-semibold text-[#fbf8e0]/70">
        StuFlash Media Pembelajaran &copy; {new Date().getFullYear()} &bull; Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
