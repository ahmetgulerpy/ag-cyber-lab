"use client";

import { useState } from "react";

const tasks = [
  "İşletim sistemimi buldum",
  "CPU modelimi buldum",
  "RAM miktarımı buldum",
  "Disk kapasitemi buldum",
];

export default function LabTask() {
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(tasks.length).fill(false)
  );

  const [isCompleted, setIsCompleted] = useState(false);

  const completedCount = completedTasks.filter(Boolean).length;

  const progress = Math.round(
    (completedCount / tasks.length) * 100
  );

  const toggleTask = (index: number) => {
    if (isCompleted) return;

    setCompletedTasks((current) =>
      current.map((completed, i) =>
        i === index ? !completed : completed
      )
    );
  };

  const completeLab = () => {
    if (completedCount !== tasks.length) return;

    setIsCompleted(true);
  };

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      {/* Başlık */}
      <div className="mb-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          🧪 Uygulama 01
        </div>

        <h2 className="text-xl font-semibold text-white">
          Sistemini Tanı
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Kendi bilgisayarındaki temel sistem bilgilerini bul.
          Bu uygulamanın amacı bilgisayarının temel bileşenlerini
          tanımaya başlamandır.
        </p>
      </div>

      {/* Görevler */}
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const isTaskCompleted = completedTasks[index];

          return (
            <button
              key={task}
              type="button"
              onClick={() => toggleTask(index)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                isTaskCompleted
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-cyan-500"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                  isTaskCompleted
                    ? "border-emerald-500 bg-emerald-500 text-black"
                    : "border-zinc-600 bg-zinc-950 text-transparent"
                }`}
              >
                ✓
              </span>

              <span
                className={
                  isTaskCompleted
                    ? "text-emerald-400"
                    : "text-zinc-200"
                }
              >
                {task}
              </span>
            </button>
          );
        })}
      </div>

      {/* İlerleme */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            İlerleme
          </span>

          <span className="font-semibold text-cyan-400">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tamamlama */}
      <div className="mt-6">
        <button
          type="button"
          onClick={completeLab}
          disabled={completedCount !== tasks.length || isCompleted}
          className={`w-full rounded-xl p-4 font-semibold transition ${
            isCompleted
              ? "cursor-default bg-emerald-500/10 text-emerald-400"
              : completedCount === tasks.length
                ? "bg-cyan-500 text-black hover:bg-cyan-400"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
          }`}
        >
          {isCompleted
            ? "✓ Uygulama Tamamlandı"
            : "Görevi Tamamla"}
        </button>
      </div>

      {/* Başarı mesajı */}
      {isCompleted && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="font-semibold text-emerald-400">
            🎉 Uygulama başarıyla tamamlandı!
          </p>

          <p className="mt-1 text-sm text-zinc-300">
            Bilgisayarının temel sistem bileşenlerini tanıdın.
          </p>

          <div className="mt-3 font-semibold text-cyan-400">
            +25 XP
          </div>
        </div>
      )}
    </section>
  );
}