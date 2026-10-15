"use client";

import type { Pool } from "@/lib/pools-data";
import { PoolCard } from "./PoolCard";

interface ResultsScreenProps {
  pools: Pool[];
  onRestart: () => void;
}

export function ResultsScreen({ pools, onRestart }: ResultsScreenProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 text-center sm:mb-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-aqua-400 text-3xl shadow-lg shadow-ocean-500/25">
          ✨
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Мы подобрали {pools.length}{" "}
          {pools.length === 1 ? "вариант" : pools.length < 5 ? "варианта" : "вариантов"}
        </h2>
        <p className="mt-2 text-base text-slate-500">
          Нажмите на карточку, чтобы перейти на страницу бассейна
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {pools.map((pool, index) => (
          <PoolCard key={pool.id} pool={pool} rank={index + 1} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-ocean-300 hover:bg-ocean-50 hover:text-ocean-700"
        >
          Пройти квиз заново
        </button>
      </div>
    </div>
  );
}
