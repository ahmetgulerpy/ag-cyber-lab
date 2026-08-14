"use client";

import { useEffect, useState } from "react";

import {
  createModuleLessonProgress,
  getCompletedCount,
  isLessonCompleted,
  toggleLessonComplete,
} from "@/lib/lessons/progress";

import {
  loadLessonProgress,
  saveLessonProgress,
} from "@/lib/lessons/storage";

import type {
  ModuleLessonProgress,
} from "@/types/lesson-progress";

interface LessonCompleteButtonProps {
  moduleId: string;
  slug: string;
  totalLessons: number;
}

export default function LessonCompleteButton({
  moduleId,
  slug,
  totalLessons,
}: LessonCompleteButtonProps) {
  const [progress, setProgress] = useState(
    () =>
      createModuleLessonProgress(moduleId),
  );

  const [hydrated, setHydrated] =
    useState(false);

  /*
   * localStorage → state
   */
  useEffect(() => {
    const stored = loadLessonProgress();

    if (
      stored &&
      stored.moduleId === moduleId
    ) {
      setProgress(stored);
    }

    setHydrated(true);
  }, [moduleId]);

  /*
   * state → localStorage
   */
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    saveLessonProgress(progress);
  }, [progress, hydrated]);

  if (!hydrated) {
    return (
      <div className="border border-[#252b29] bg-[#0b0e0d] px-5 py-5 sm:px-6 sm:py-6">
        <div className="h-16 animate-pulse bg-[#0d100f]" />
      </div>
    );
  }

  const completed = isLessonCompleted(
    progress,
    slug,
  );

  const completedCount =
    getCompletedCount(progress);

  const percentage =
    totalLessons > 0
      ? Math.round(
          (completedCount / totalLessons) *
            100,
        )
      : 0;

  function handleToggle() {
    setProgress((current) =>
      toggleLessonComplete(current, slug),
    );
  }

  return (
    <div className="border border-[#252b29] bg-[#0b0e0d]">
      <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-6">
        {/* Progress Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#59615d]">
              MODULE PROGRESS
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a8b0ab]">
              {String(completedCount).padStart(
                2,
                "0",
              )}{" "}
              /{" "}
              {String(totalLessons).padStart(
                2,
                "0",
              )}
            </span>
          </div>

          <div className="h-[3px] bg-[#1a1f1d]">
            <div
              className="h-full bg-[#b7ff3c] transition-[width] duration-500"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className={`shrink-0 border px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition ${
            completed
              ? "border-[#252b29] bg-[#080a0b] text-[#59615d] hover:border-[#343b38] hover:text-[#a8b0ab]"
              : "border-[#b7ff3c] bg-[#b7ff3c] text-[#080a0b] hover:bg-[#c4ff61]"
          }`}
        >
          {completed
            ? "COMPLETED ✓"
            : "MARK LESSON COMPLETE"}
        </button>
      </div>
    </div>
  );
}