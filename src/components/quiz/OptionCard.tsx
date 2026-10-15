"use client";

import type { QuizOption } from "@/lib/pools-data";

interface OptionCardProps<T extends string> {
  option: QuizOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
}

export function OptionCard<T extends string>({
  option,
  selected,
  onSelect,
}: OptionCardProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`group relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/10 sm:p-6 ${
        selected
          ? "border-ocean-500 bg-ocean-50/80 shadow-md shadow-ocean-500/15"
          : "border-slate-200/80 bg-white/70 hover:border-ocean-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors ${
            selected ? "bg-ocean-100" : "bg-slate-100 group-hover:bg-ocean-50"
          }`}
        >
          {option.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-base font-semibold sm:text-lg ${
              selected ? "text-ocean-900" : "text-slate-800"
            }`}
          >
            {option.label}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {option.description}
          </p>
        </div>
        <div
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            selected
              ? "border-ocean-500 bg-ocean-500"
              : "border-slate-300 group-hover:border-ocean-400"
          }`}
        >
          {selected && (
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
