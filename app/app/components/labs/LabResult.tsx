"use client";

import type {
  LabDefinition,
  LabProgress,
} from "@/types/lab";

interface LabResultProps {
  lab: LabDefinition;
  progress: LabProgress;
  onRetry: () => void;
}

export default function LabResult({
  lab,
  progress,
  onRetry,
}: LabResultProps) {
  const passed =
    progress.percentage >=
    lab.completion.minimumScore;

  return (
    <section className="relative overflow-hidden border border-[#252b29] bg-[#0d1011]">
      <div className="flex items-center justify-between border-b border-[#252b29] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#747d78] sm:px-8">
        <span>AG / LAB SYSTEM</span>

        <span>
          {lab.id} / RESULT
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px]">
        <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="mb-12">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-[#b7ff3c]">
              Session complete
            </div>

            <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#e8ebe6] sm:text-6xl">
              {lab.title}
            </h2>
          </div>

          <div className="flex items-end gap-4">
            <span className="text-7xl font-black leading-none tracking-[-0.07em] text-[#e8ebe6] sm:text-8xl">
              {progress.percentage}
            </span>

            <div className="pb-2 font-mono">
              <div className="text-xl text-[#b7ff3c]">
                %
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#747d78]">
                Performance
              </div>
            </div>
          </div>

          <div className="mt-10 h-px bg-[#252b29]">
            <div
              className="h-px bg-[#b7ff3c]"
              style={{
                width: `${Math.min(
                  progress.percentage,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        <aside className="border-t border-[#252b29] bg-[#0a0d0e] lg:border-l lg:border-t-0">
          <div className="border-b border-[#252b29] p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#747d78]">
              Verification
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 ${
                  passed
                    ? "bg-[#b7ff3c]"
                    : "bg-[#ff5d5d]"
                }`}
              />

              <span className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-[#e8ebe6]">
                {passed
                  ? "Passed"
                  : "Incomplete"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <ResultMetric
              label="Score"
              value={`${progress.score}/${progress.maxScore}`}
            />

            <ResultMetric
              label="Hints"
              value={String(
                progress.hintsUsed,
              ).padStart(2, "0")}
            />

            <ResultMetric
              label="Attempts"
              value={String(
                progress.attempts,
              ).padStart(2, "0")}
            />

            <ResultMetric
              label="Tasks"
              value={String(
                lab.tasks.length,
              ).padStart(2, "0")}
            />
          </div>

          <div className="border-t border-[#252b29] p-6 sm:p-8">
            <p className="text-sm leading-6 text-[#a8b0ab]">
              {passed
                ? "Gerekli görevler tamamlandı ve lab oturumu başarıyla kapatıldı."
                : `Bu lab için minimum başarı oranı %${lab.completion.minimumScore}.`}
            </p>

            {lab.completion.allowRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-7 w-full border border-[#b7ff3c] bg-[#b7ff3c] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#080a0b] transition hover:bg-transparent hover:text-[#b7ff3c]"
              >
                Run lab again ↻
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

interface ResultMetricProps {
  label: string;
  value: string;
}

function ResultMetric({
  label,
  value,
}: ResultMetricProps) {
  return (
    <div className="border-b border-r border-[#252b29] p-5 sm:p-6">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#747d78]">
        {label}
      </div>

      <div className="mt-2 font-mono text-xl font-bold text-[#e8ebe6]">
        {value}
      </div>
    </div>
  );
}