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
    <section>
      <header>
        <h2>
          {passed
            ? "Lab tamamlandı"
            : "Lab tamamlandı"}
        </h2>

        <p>
          {lab.title}
        </p>
      </header>

      <div>
        <p>
          Puan:{" "}
          <strong>
            {progress.score} /{" "}
            {progress.maxScore}
          </strong>
        </p>

        <p>
          Başarı:{" "}
          <strong>
            {progress.percentage}%
          </strong>
        </p>

        <p>
          Kullanılan ipucu:{" "}
          <strong>
            {progress.hintsUsed}
          </strong>
        </p>

        <p>
          Toplam deneme:{" "}
          <strong>
            {progress.attempts}
          </strong>
        </p>
      </div>

      <p>
        {passed
          ? "Lab başarıyla tamamlandı."
          : `Geçmek için en az %${lab.completion.minimumScore} gerekiyor.`}
      </p>

      {lab.completion.allowRetry && (
        <button
          type="button"
          onClick={onRetry}
        >
          Labı tekrar başlat
        </button>
      )}
    </section>
  );
}