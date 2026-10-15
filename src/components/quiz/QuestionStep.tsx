"use client";

import type { QuizAnswers, QuizQuestion } from "@/lib/pools-data";
import { OptionCard } from "./OptionCard";

interface QuestionStepProps {
  question: QuizQuestion;
  selectedValue: QuizAnswers[keyof QuizAnswers];
  onSelect: (value: string) => void;
}

export function QuestionStep({ question, selectedValue, onSelect }: QuestionStepProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 text-center sm:mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {question.title}
        </h2>
        <p className="mt-2 text-base text-slate-500">{question.subtitle}</p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {question.options.map((option) => (
          <OptionCard
            key={option.value}
            option={option}
            selected={selectedValue === option.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
