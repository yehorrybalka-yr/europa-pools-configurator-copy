"use client";

import Image from "next/image";
import type { Pool } from "@/lib/pools-data";

interface PoolCardProps {
  pool: Pool;
  rank: number;
}

export function PoolCard({ pool, rank }: PoolCardProps) {
  return (
    <a
      href={pool.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ocean-300 hover:shadow-xl hover:shadow-ocean-500/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={pool.image}
          alt={pool.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {rank === 1 && (
          <span className="absolute left-3 top-3 rounded-full bg-ocean-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Лучшее совпадение
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-ocean-700 sm:text-xl">
            {pool.name}
          </h3>
          <span className="shrink-0 rounded-lg bg-ocean-50 px-2.5 py-1 text-sm font-semibold text-ocean-700">
            {pool.price}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">
          {pool.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {pool.tags.construction.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-600"
              >
                {tag === "composite"
                  ? "Композит"
                  : tag === "frame"
                    ? "Каркас"
                    : "Бетон"}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-ocean-600 transition-colors group-hover:text-ocean-700">
            Подробнее
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
