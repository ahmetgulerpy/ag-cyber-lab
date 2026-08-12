"use client";

import { useState } from "react";

const options = [
  "Donanım",
  "Yazılım",
  "İşletim Sistemi",
  "Uygulama",
];

const correctAnswer = "Donanım";

export default function Quiz({ onComplete }: { onComplete?: () => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer: string) => {
  if (isAnswered) return;

  setSelectedAnswer(answer);
  setIsAnswered(true);

  if (answer === correctAnswer) {
    onComplete?.();
  }
};

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          🧠 Mini Quiz
        </div>

        <h2 className="text-xl font-semibold text-white">
          Bilgisayarın fiziksel parçalarına ne ad verilir?
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Doğru cevabı seç.
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === correctAnswer;

          let buttonClass =
            "border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-cyan-500 hover:bg-zinc-800";

          if (isAnswered && isSelected && isCorrectOption) {
            buttonClass =
              "border-emerald-500 bg-emerald-500/10 text-emerald-400";
          }

          if (isAnswered && isSelected && !isCorrectOption) {
            buttonClass =
              "border-red-500 bg-red-500/10 text-red-400";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full rounded-xl border p-4 text-left transition ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`mt-6 rounded-xl border p-4 ${
            isCorrect
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-red-500/30 bg-red-500/10"
          }`}
        >
          {isCorrect ? (
            <>
              <p className="font-semibold text-emerald-400">
                ✓ Doğru cevap!
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Donanım, bilgisayarın fiziksel olarak dokunabildiğimiz
                parçalarına verilen isimdir.
              </p>

              <div className="mt-3 font-semibold text-cyan-400">
                +10 XP
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-red-400">
                ✕ Yanlış cevap.
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Donanım, bilgisayarın fiziksel parçalarını ifade eder.
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}