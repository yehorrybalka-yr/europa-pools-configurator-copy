"use client";

import { useCallback, useMemo, useState } from "react";
import {
  filterPools,
  INITIAL_ANSWERS,
  QUIZ_QUESTIONS,
  type QuizAnswers,
} from "@/lib/pools-data";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";
import { ResultsScreen } from "./ResultsScreen";

export function QuizConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const isResults = currentStep >= QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  const matchedPools = useMemo(
    () => (isResults ? filterPools(answers) : []),
    [answers, isResults],
  );

  const handleSelect = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value as QuizAnswers[typeof currentQuestion.id],
      }));
    },
    [currentQuestion],
  );

  const handleNext = useCallback(() => {
    if (currentAnswer && currentStep < QUIZ_QUESTIONS.length) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  }, [currentAnswer, currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(0);
    setDirection("forward");
  }, []);

  const totalSteps = QUIZ_QUESTIONS.length + 1;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Header */}
      <div className="mb-8 text-center sm:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-1.5 text-sm font-medium text-ocean-700">
          <span className="text-base">💧</span>
          Подбор бассейна
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Найдите идеальный бассейн
        </h1>
        <p className="mt-2 text-base text-slate-500 sm:text-lg">
          Ответьте на {QUIZ_QUESTIONS.length} вопроса — мы подберём лучшие варианты
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 sm:mb-10">
        <ProgressBar
          currentStep={isResults ? QUIZ_QUESTIONS.length : currentStep}
          totalSteps={totalSteps}
        />
      </div>

      {/* Content */}
      <div
        key={currentStep}
        className={`rounded-3xl border border-white/60 bg-white/60 p-5 shadow-xl shadow-ocean-500/5 backdrop-blur-sm sm:p-8 md:p-10 ${
          direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"
        }`}
      >
        {isResults ? (
          <ResultsScreen pools={matchedPools} onRestart={handleRestart} />
        ) : (
          <>
            <QuestionStep
              question={currentQuestion}
              selectedValue={currentAnswer}
              onSelect={handleSelect}
            />

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4 sm:mt-10">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-0"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Назад
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ocean-600 to-ocean-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean-500/25 transition-all hover:from-ocean-700 hover:to-ocean-600 hover:shadow-ocean-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {currentStep === QUIZ_QUESTIONS.length - 1 ? "Показать результаты" : "Далее"}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
