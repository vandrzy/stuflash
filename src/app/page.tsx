'use client';

import React, { useState } from 'react';
import { GameScreenState, FlashcardQuestion, UserAnswerRecord, GameSummary, DifficultyLevel } from '../types/flashcard';
import { DECK_CATEGORIES, FLASHCARD_QUESTIONS } from '../data/flashcards';
import { StartScreen } from '../components/StartScreen';
import { QuestionView } from '../components/QuestionView';
import { ScoreScreen } from '../components/ScoreScreen';

export default function Home() {
  const [screenState, setScreenState] = useState<GameScreenState>('start');
  const [activeDeckCategory, setActiveDeckCategory] = useState<string>('science');
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel>('medium');
  const [activeQuestions, setActiveQuestions] = useState<FlashcardQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);

  // Start game handler
  const handleStartGame = (categoryId: string, difficulty: DifficultyLevel, _materialBlob: Blob | null) => {
    setActiveDeckCategory(categoryId);
    setActiveDifficulty(difficulty);

    let selected: FlashcardQuestion[] = [];

    if (categoryId === 'generate') {
      // Custom flashcards generated from uploaded material blob (size check)
      const hasBlob = _materialBlob !== null && _materialBlob.size > 0;
      const sourceLabel = hasBlob ? 'Uploaded Document Material' : 'Custom Material';

      selected = [
        {
          id: 'gen-1',
          category: sourceLabel,
          question: `[${difficulty.toUpperCase()}] Key concept from your uploaded material: What is the main thesis of the document?`,
          options: [
            'Core fundamentals and foundational concepts',
            'Advanced theoretical application',
            'Historical background analysis',
            'Experimental methodologies',
          ],
          correctAnswerIndex: 0,
          explanation: 'Generated based on uploaded material blob content.',
        },
        {
          id: 'gen-2',
          category: sourceLabel,
          question: `[${difficulty.toUpperCase()}] According to your material, which factor has the highest impact on outcomes?`,
          options: ['Environmental variables', 'Primary input parameters', 'Legacy system constraints', 'Random fluctuations'],
          correctAnswerIndex: 1,
          explanation: 'Extracted key parameter from study material.',
        },
        {
          id: 'gen-3',
          category: sourceLabel,
          question: `[${difficulty.toUpperCase()}] What is the recommended best practice highlighted in the document?`,

          options: [
            'Immediate full deployment',
            'Iterative testing and validation',
            'Manual override protocols',
            'Static parameter locking',
          ],
          correctAnswerIndex: 1,
          explanation: 'Standard operational practice noted in uploaded document.',
        },
      ];
    } else {
      selected = FLASHCARD_QUESTIONS.filter((q) => q.category === categoryId);
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
    const isCorrect = selectedIndex >= 0 && selectedIndex === currentQ.correctAnswerIndex;

    const pointsEarned = isCorrect ? 100 : 0;
    setScore((prev) => prev + pointsEarned);

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      question: currentQ.question,
      selectedOptionIndex: selectedIndex,
      selectedOptionText: selectedIndex >= 0 ? currentQ.options[selectedIndex] : 'Waktu Habis / Tidak Dijawab',
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
      const deckName = categoryObj ? `${categoryObj.name} (${activeDifficulty.toUpperCase()})` : 'Custom Deck';

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
    handleStartGame(activeDeckCategory, activeDifficulty, null);
  };

  const handleChangeDeck = () => {
    setScreenState('start');
  };

  return (
    <main className="min-h-screen flex flex-col justify-between py-4 px-4 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full my-auto overflow-hidden">
        {screenState === 'start' && <StartScreen onStartGame={handleStartGame} />}

        {screenState === 'playing' && activeQuestions.length > 0 && (
          <QuestionView
            key={currentQuestionIndex}
            question={activeQuestions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            score={score}
            difficulty={activeDifficulty}
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
    </main>
  );
}
