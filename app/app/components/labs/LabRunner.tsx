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
    <section>
      <header>
        <p>
          Görev{" "}
          {progress.currentTaskIndex + 1}{" "}
          / {lab.tasks.length}
        </p>

        <h2>
          {currentTask.title}
        </h2>

        <p>
          {currentTask.instruction}
        </p>
      </header>

      <LabTask
        task={currentTask}
        answer={taskProgress.answer}
        disabled={taskProgress.completed}
        onAnswerChange={
          handleAnswerChange
        }
      />

      {message && (
        <p role="status">
          {message}
        </p>
      )}

      {hintState.hints.length > 0 && (
        <div>
          <h3>İpuçları</h3>

          {hintState.hints.map(
            (hint) => (
              <div key={hint.level}>
                <strong>
                  {hint.title}
                </strong>

                <p>
                  {hint.text}
                </p>
              </div>
            ),
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
        }}
      >
        {hintState.canRevealMore && (
          <button
            type="button"
            onClick={handleHint}
          >
            İpucu göster
          </button>
        )}

        {!taskProgress.completed ? (
          <button
            type="button"
            onClick={handleCheck}
          >
            Cevabı kontrol et
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
          >
            {progress.currentTaskIndex ===
            lab.tasks.length - 1
              ? "Labı tamamla"
              : "Sonraki görev"}
          </button>
        )}
      </div>

      <footer
        style={{
          marginTop: 24,
        }}
      >
        <p>
          Puan: {progress.score} /{" "}
          {progress.maxScore}
        </p>

        <p>
          İlerleme:{" "}
          {progress.percentage}%
        </p>
      </footer>
    </section>
  );
}