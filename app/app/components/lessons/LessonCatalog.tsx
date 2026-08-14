"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  createModuleLessonProgress,
  getCompletedCount,
  isLessonCompleted,
} from "@/lib/lessons/progress";

import {
  loadLessonProgress,
} from "@/lib/lessons/storage";

import type { LessonMeta } from "@/types/lesson";

import type {
  ModuleLessonProgress,
} from "@/types/lesson-progress";

interface LessonCatalogProps {
  lessons: LessonMeta[];
}

export default function LessonCatalog({
  lessons,
}: LessonCatalogProps) {
  const [progress, setProgress] = useState(
    () =>
      createModuleLessonProgress(
        lessons[0]?.moduleId ?? "",
      ),
  );

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    const stored = loadLessonProgress();

    if (stored) {
      setProgress(stored);
    }

    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="space-y-px border border-[#252b29] bg-[#252b29]">
        {lessons.map((lesson) => (
          <div
            key={lesson.slug}
            className="bg-[#0b0e0d] px-5 py-5 sm:px-6"
          >
            <div className="flex items-center gap-4">
              <span className="h-4 w-4 animate-pulse bg-[#1a1f1d]" />

              <div className="h-4 flex-1 animate-pulse bg-[#1a1f1d]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-px border border-[#252b29] bg-[#252b29]">
      {lessons.map((lesson) => {
        const completed = isLessonCompleted(
          progress,
          lesson.slug,
        );

        return (
          <Link
            key={lesson.slug}
            href={`/lessons/${lesson.slug}`}
            className="group flex items-center gap-4 bg-[#0b0e0d] px-5 py-4 transition hover:bg-[#101413] sm:px-6"
          >
            {/* Completion indicator */}
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                completed
                  ? "border-[#b7ff3c] bg-[#b7ff3c]"
                  : "border-[#3d4743]"
              }`}
            >
              {completed && (
                <span className="font-mono text-[8px] font-bold text-[#080a0b]">
                  ✓
                </span>
              )}
            </span>

            {/* Order */}
            <span
              className={`w-8 shrink-0 font-mono text-xs ${
                completed
                  ? "text-[#b7ff3c]"
                  : "text-[#59615d]"
              }`}
            >
              {String(lesson.order).padStart(
                2,
                "0",
              )}
            </span>

            {/* Title */}
            <span
              className={`min-w-0 flex-1 truncate text-sm ${
                completed
                  ? "text-[#a8b0ab]"
                  : "text-[#e8ebe6] group-hover:text-[#b7ff3c]"
              }`}
            >
              {lesson.title}
            </span>

            {/* Arrow */}
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#3d4743] transition group-hover:text-[#59615d] sm:block">
              OPEN →
            </span>
          </Link>
        );
      })}
    </div>
  );
}