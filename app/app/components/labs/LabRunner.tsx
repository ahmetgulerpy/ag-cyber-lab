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
  <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/30">
    <div className="border-b border-slate-800 bg-slate-900/50 px-5 py-4 sm:px-7">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Görev {progress.currentTaskIndex + 1} /{" "}
          {lab.tasks.length}
        </span>

        <span className="font-mono text-xs text-slate-500">
          {progress.percentage}% tamamlandı
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-500"
          style={{
            width: `${progress.percentage}%`,
          }}
        />
      </div>
    </div>

    <div className="px-5 py-7 sm:px-7 sm:py-9">
      <div className="mb-8">
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          TASK / {currentTask.id}
        </div>

        <h2 className="text-2xl font-semibold text-white">
          {currentTask.title}
        </h2>

        <p className="mt-3 max-w-3xl font-mono text-[12px] leading-6 tracking-wide text-[#a8b0ab]">
            {currentTask.instruction}
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#0b111b] p-5 sm:p-6">
        <LabTask
          task={currentTask}
          answer={taskProgress.answer}
          disabled={taskProgress.completed}
          onAnswerChange={handleAnswerChange}
        />
      </div>

      {message && (
        <div
          role="status"
          className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
            taskProgress.completed
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-amber-500/30 bg-amber-500/10 text-amber-200"
          }`}
        >
          {message}
        </div>
      )}

      {hintState.hints.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
            İpuçları
          </div>

          {hintState.hints.map((hint) => (
            <div
              key={hint.level}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4"
            >
              <div className="font-medium text-amber-200">
                {hint.title}
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                {hint.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {hintState.canRevealMore && (
            <button
              type="button"
              onClick={handleHint}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-amber-500/40 hover:text-amber-300"
            >
              İpucu göster
            </button>
          )}
        </div>

        {!taskProgress.completed ? (
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Cevabı kontrol et
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            {progress.currentTaskIndex ===
            lab.tasks.length - 1
              ? "Labı tamamla"
              : "Sonraki görev →"}
          </button>
        )}
      </div>
    </div>

    <footer className="flex flex-wrap gap-x-8 gap-y-2 border-t border-slate-800 bg-slate-900/30 px-5 py-4 font-mono text-xs text-slate-500 sm:px-7">
      <span>
        SCORE{" "}
        <strong className="text-slate-300">
          {progress.score}/{progress.maxScore}
        </strong>
      </span>

      <span>
        HINTS{" "}
        <strong className="text-slate-300">
          {progress.hintsUsed}
        </strong>
      </span>

      <span>
        ATTEMPTS{" "}
        <strong className="text-slate-300">
          {progress.attempts}
        </strong>
      </span>
    </footer>
  </section>
);
}