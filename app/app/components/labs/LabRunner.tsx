"use client";

import {
  useEffect,
  useState,
} from "react";

import LabResult from "./LabResult";
import LabTask from "./LabTask";

import {
  getHintState,
  revealNextHint,
} from "@/lib/labs/hint";

import {
  completeLab,
  completeTask,
  createLabProgress,
  registerAttempt,
  registerHint,
  restoreLabProgress,
  setCurrentTaskIndex,
  setTaskAnswer,
} from "@/lib/labs/progress";

import {
  loadLabProgress,
  removeLabProgress,
  saveLabProgress,
} from "@/lib/labs/storage";

import { validateTask } from "@/lib/labs/validator";

import type {
  LabAnswerValue,
  LabDefinition,
} from "@/types/lab";

interface LabRunnerProps {
  lab: LabDefinition;
}

export default function LabRunner({
  lab,
}: LabRunnerProps) {
  const [progress, setProgress] = useState(
    () => createLabProgress(lab),
  );

  const [hydrated, setHydrated] =
    useState(false);

  const [message, setMessage] = useState<
    string | null
  >(null);

  /*
   * --------------------------------------------------
   * localStorage -> state
   * --------------------------------------------------
   */
  useEffect(() => {
    const stored =
      loadLabProgress(lab.id);

    if (stored) {
      setProgress(
        restoreLabProgress(
          lab,
          stored,
        ),
      );
    }

    setHydrated(true);
  }, [lab]);

  /*
   * --------------------------------------------------
   * state -> localStorage
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    saveLabProgress(progress);
  }, [progress, hydrated]);

  /*
   * Storage okunana kadar geçici progress'i
   * göstermiyoruz.
   */
  if (!hydrated) {
    return (
      <section>
        <p>Lab yükleniyor...</p>
      </section>
    );
  }

  const currentTask =
    lab.tasks[progress.currentTaskIndex];

  if (!currentTask) {
    return (
      <section>
        <p>
          Bu lab içinde görev bulunamadı.
        </p>
      </section>
    );
  }

  const taskProgress =
    progress.tasks[currentTask.id];

  if (!taskProgress) {
    return (
      <section>
        <p>
          Görev ilerleme verisi bulunamadı.
        </p>
      </section>
    );
  }

  const hintState = getHintState(
    currentTask,
    taskProgress.usedHints.length,
  );

  /*
   * --------------------------------------------------
   * Answer
   * --------------------------------------------------
   */
  function handleAnswerChange(
    answer: LabAnswerValue,
  ) {
    setProgress((current) =>
      setTaskAnswer(
        current,
        currentTask.id,
        answer,
      ),
    );

    setMessage(null);
  }

  /*
   * --------------------------------------------------
   * Validate
   * --------------------------------------------------
   */
  function handleCheck() {
    const validation = validateTask(
      currentTask,
      taskProgress.answer,
    );

    setProgress((current) => {
      const attempted =
        registerAttempt(
          current,
          currentTask.id,
        );

      if (!validation.canContinue) {
        return attempted;
      }

      return completeTask(
        attempted,
        currentTask,
        validation.correct,
      );
    });

    setMessage(
      validation.message ?? null,
    );
  }

  /*
   * --------------------------------------------------
   * Hint
   * --------------------------------------------------
   */
  function handleHint() {
    const next = revealNextHint(
      currentTask,
      taskProgress.usedHints.length,
    );

    if (
      next.revealedCount <=
      taskProgress.usedHints.length
    ) {
      return;
    }

    const revealedHint =
      next.hints[
        next.hints.length - 1
      ];

    if (!revealedHint) {
      return;
    }

    setProgress((current) =>
      registerHint(
        current,
        currentTask.id,
        revealedHint.level,
      ),
    );
  }

  /*
   * --------------------------------------------------
   * Next
   * --------------------------------------------------
   */
  function handleNext() {
    if (!taskProgress.completed) {
      return;
    }

    const isLastTask =
      progress.currentTaskIndex ===
      lab.tasks.length - 1;

    if (isLastTask) {
      setProgress((current) =>
        completeLab(current),
      );

      return;
    }

    setProgress((current) =>
      setCurrentTaskIndex(
        current,
        current.currentTaskIndex + 1,
        lab.tasks.length,
      ),
    );

    setMessage(null);
  }

  /*
   * --------------------------------------------------
   * Retry
   * --------------------------------------------------
   */
  function handleRetry() {
    /*
     * Önce mevcut kayıt temizlenir.
     */
    removeLabProgress(lab.id);

    /*
     * Sonra sıfır progress oluşturulur.
     *
     * useEffect bu yeni progress'i tekrar
     * localStorage'a kaydeder.
     */
    setProgress(
      createLabProgress(lab),
    );

    setMessage(null);
  }

  /*
   * --------------------------------------------------
   * Result Screen
   * --------------------------------------------------
   */
  if (progress.completed) {
    return (
      <LabResult
        lab={lab}
        progress={progress}
        onRetry={handleRetry}
      />
    );
  }

  /*
   * --------------------------------------------------
   * Lab UI
   * --------------------------------------------------
   */
  return (
  <section className="overflow-hidden border border-[#252b29] bg-[#080a0b]">
    {/* Session / Progress Header */}
    <header className="border-b border-[#252b29]">
      <div className="flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#59615d]">
              AG / LAB SYSTEM
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="h-2 w-2 bg-[#b7ff3c]" />

              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#b7ff3c]">
                SESSION ACTIVE
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#59615d]">
              TASK
            </div>

            <div className="mt-1 font-mono text-sm text-[#e8ebe6]">
              {String(progress.currentTaskIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-[#3d4743]">/</span>
              {String(lab.tasks.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-[#59615d]">
              SESSION PROGRESS
            </span>

            <span className="text-[#a8b0ab]">
              {progress.percentage}%
            </span>
          </div>

          <div className="h-[3px] bg-[#1a1f1d]">
            <div
              className="h-full bg-[#b7ff3c] transition-[width] duration-500"
              style={{
                width: `${progress.percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </header>

    {/* Task Workspace */}
    <div className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="mb-8 border-b border-[#252b29] pb-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b7ff3c]">
            TASK / {currentTask.id}
          </span>

          <span className="hidden h-px w-8 bg-[#343b38] sm:block" />

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
            VERIFICATION REQUIRED
          </span>
        </div>

        <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-[#e8ebe6] sm:text-3xl">
          {currentTask.title}
        </h2>

        <p className="mt-4 max-w-3xl font-mono text-xs leading-6 tracking-wide text-[#8d9691]">
          {currentTask.instruction}
        </p>
      </div>

      {/* Response Area */}
      <div className="border border-[#252b29] bg-[#0b0e0d] p-4 sm:p-6">
        <LabTask
          task={currentTask}
          answer={taskProgress.answer}
          disabled={taskProgress.completed}
          onAnswerChange={handleAnswerChange}
        />
      </div>

      {/* Validation */}
      {message && (
        <div
          role="status"
          className={`mt-4 border px-4 py-4 sm:px-5 ${
            taskProgress.completed
              ? "border-[#405828] bg-[#10160c]"
              : "border-[#4a4430] bg-[#12110c]"
          }`}
        >
          <div className="flex gap-3">
            <span
              className={`mt-[7px] h-1.5 w-1.5 shrink-0 ${
                taskProgress.completed
                  ? "bg-[#b7ff3c]"
                  : "bg-[#c9b86a]"
              }`}
            />

            <div>
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  taskProgress.completed
                    ? "text-[#b7ff3c]"
                    : "text-[#c9b86a]"
                }`}
              >
                {taskProgress.completed
                  ? "VERIFICATION / PASSED"
                  : "VERIFICATION / REVIEW"}
              </div>

              <p className="mt-2 text-sm leading-6 text-[#a8b0ab]">
                {message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hint System */}
      {hintState.hints.length > 0 && (
        <div className="mt-6 border border-[#252b29]">
          <div className="flex items-center justify-between border-b border-[#252b29] bg-[#0b0e0d] px-4 py-3 sm:px-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8d9691]">
              ASSISTANCE / HINT LOG
            </span>

            <span className="font-mono text-[10px] text-[#59615d]">
              {String(hintState.hints.length).padStart(2, "0")}
            </span>
          </div>

          <div className="divide-y divide-[#252b29]">
            {hintState.hints.map((hint) => (
              <div
                key={hint.level}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[72px_1fr] sm:px-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
                  LVL {String(hint.level).padStart(2, "0")}
                </div>

                <div>
                  <div className="font-mono text-xs font-medium uppercase tracking-wide text-[#c9b86a]">
                    {hint.title}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#8d9691]">
                    {hint.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-3 border-t border-[#252b29] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {hintState.canRevealMore && (
            <button
              type="button"
              onClick={handleHint}
              className="w-full border border-[#343b38] bg-[#080a0b] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#a8b0ab] transition hover:border-[#59615d] hover:text-[#e8ebe6] sm:w-auto"
            >
              REQUEST HINT
            </button>
          )}
        </div>

        {!taskProgress.completed ? (
          <button
            type="button"
            onClick={handleCheck}
            className="w-full border border-[#b7ff3c] bg-[#b7ff3c] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0b] transition hover:bg-[#c4ff61] sm:w-auto"
          >
            VERIFY RESPONSE
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="w-full border border-[#b7ff3c] bg-[#b7ff3c] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#080a0b] transition hover:bg-[#c4ff61] sm:w-auto"
          >
            {progress.currentTaskIndex === lab.tasks.length - 1
              ? "COMPLETE LAB"
              : "NEXT TASK →"}
          </button>
        )}
      </div>
    </div>

    {/* Session Metrics */}
    <footer className="grid grid-cols-3 border-t border-[#252b29] bg-[#0b0e0d]">
      <div className="border-r border-[#252b29] px-3 py-4 sm:px-6">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
          SCORE
        </div>

        <div className="mt-1 font-mono text-xs text-[#e8ebe6] sm:text-sm">
          {progress.score}
          <span className="text-[#59615d]">
            /{progress.maxScore}
          </span>
        </div>
      </div>

      <div className="border-r border-[#252b29] px-3 py-4 sm:px-6">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
          HINTS
        </div>

        <div className="mt-1 font-mono text-xs text-[#e8ebe6] sm:text-sm">
          {progress.hintsUsed}
        </div>
      </div>

      <div className="px-3 py-4 sm:px-6">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
          ATTEMPTS
        </div>

        <div className="mt-1 font-mono text-xs text-[#e8ebe6] sm:text-sm">
          {progress.attempts}
        </div>
      </div>
    </footer>
  </section>
);
}