"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    question:
      "Bilgisayarın işlemleri gerçekleştiren temel bileşeni hangisidir?",
    options: ["RAM", "CPU", "SSD", "HDD"],
    answer: "CPU",
  },
  {
    question:
      "Bilgisayar çalışırken kullanılan geçici çalışma alanı hangisidir?",
    options: ["CPU", "RAM", "SSD", "HDD"],
    answer: "RAM",
  },
  {
    question:
      "Dosyaların bilgisayar kapatıldıktan sonra da saklanmasını sağlayan bileşen hangisidir?",
    options: ["CPU", "RAM", "Disk"],
    answer: "Disk",
  },
];

export default function Lesson02Page() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [taskChecks, setTaskChecks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const quizCompleted = questions.every(
    (question, index) => answers[index] === question.answer
  );

  const taskReady = taskChecks.every(Boolean);

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((current) => ({
      ...current,
      [questionIndex]: answer,
    }));
  };

  const handleTaskCheck = (index: number) => {
    setTaskChecks((current) => {
      const updated = [...current];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const completeTask = () => {
    if (!taskReady) return;
    setTaskCompleted(true);
  };

  const lessonCompleted = quizCompleted && taskCompleted;

  return (
    <main className="min-h-screen bg-[#070a0f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* MAIN CONTENT */}
          <div>
            {/* BREADCRUMB */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                🏠 Ana Sayfa
              </Link>

              <span className="text-white/30">/</span>

              <Link
                href="/#modules"
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                📚 Modüller
              </Link>

              <span className="text-white/30">/</span>

              <span className="text-zinc-400">Modül 01</span>

              <span className="text-white/30">/</span>

              <span className="text-white">Ders 02</span>
            </div>

            {/* HEADER */}
            <div className="mb-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                MODÜL 01 · DERS 02
              </div>

              <h1 className="text-3xl font-bold">
                CPU, RAM ve Disk
              </h1>

              <p className="mt-3 max-w-3xl text-zinc-400">
                Bilgisayarın temel bileşenlerini, görevlerini ve
                birbirleriyle nasıl çalıştıklarını öğren.
              </p>
            </div>

            {/* 01 - TEMEL KAVRAMLAR */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                01 · Temel Kavramlar
              </div>

              <h2 className="text-2xl font-semibold">
                Bilgisayarın Temel Bileşenleri
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                Bilgisayarın çalışma mantığını anlamak için özellikle üç
                bileşeni iyi anlamamız gerekir: CPU, RAM ve Disk.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <pre className="text-sm leading-7 text-cyan-300">
{`                 BİLGİSAYAR
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
         CPU        RAM        DİSK
          │          │          │
        İşler      Geçici      Kalıcı
                   çalışma    depolama
                    alanı       alanı`}
                </pre>
              </div>

              <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <p className="font-semibold text-cyan-400">
                  Akılda tut:
                </p>

                <p className="mt-1 text-sm text-zinc-300">
                  CPU işler, RAM çalışma sırasında kullanılan verileri
                  tutar, disk ise verileri kalıcı olarak saklar.
                </p>
              </div>
            </section>

            {/* 02 - CPU */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                02 · CPU
              </div>

              <h2 className="text-2xl font-semibold">
                CPU Nedir?
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                CPU, bilgisayarın merkezi işlem birimidir.
                Açılımı <strong>Central Processing Unit</strong>,
                Türkçesi ise <strong>Merkezi İşlem Birimi</strong>&apos;dir.
              </p>

              <p className="mt-4 leading-7 text-zinc-300">
                CPU&apos;yu basitçe bilgisayarın işlemleri gerçekleştiren
                temel bileşeni olarak düşünebiliriz.
              </p>

              <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm text-zinc-400">
                  Temel mantık
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-lg border border-zinc-700 px-4 py-2">
                    Program
                  </span>

                  <span className="text-cyan-400">→</span>

                  <span className="rounded-lg border border-zinc-700 px-4 py-2">
                    Talimat
                  </span>

                  <span className="text-cyan-400">→</span>

                  <span className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-cyan-300">
                    CPU
                  </span>

                  <span className="text-cyan-400">→</span>

                  <span className="rounded-lg border border-zinc-700 px-4 py-2">
                    İşlem
                  </span>
                </div>
              </div>
            </section>

            {/* 03 - RAM */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                03 · RAM
              </div>

              <h2 className="text-2xl font-semibold">
                RAM Nedir?
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                RAM, bilgisayarın geçici çalışma belleğidir.
                Açılımı <strong>Random Access Memory</strong>&apos;dir.
              </p>

              <p className="mt-4 leading-7 text-zinc-300">
                Bilgisayar çalışırken ihtiyaç duyulan verilerin
                geçici olarak tutulduğu alandır.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="text-sm font-semibold text-cyan-400">
                    RAM
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Geçici çalışma alanıdır.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="text-sm font-semibold text-cyan-400">
                    Önemli
                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Bilgisayar kapandığında RAM&apos;deki geçici veriler
                    korunmaz.
                  </p>
                </div>
              </div>
            </section>

            {/* 04 - DISK */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                04 · Disk
              </div>

              <h2 className="text-2xl font-semibold">
                Disk Nedir?
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                Disk, verilerin kalıcı olarak saklandığı depolama
                birimidir.
              </p>

              <p className="mt-4 leading-7 text-zinc-300">
                Günümüzde en yaygın depolama teknolojileri
                <strong> HDD </strong> ve <strong>SSD</strong>&apos;dir.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <h3 className="font-semibold text-white">
                    HDD
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Mekanik parçalar kullanan geleneksel depolama
                    teknolojisidir.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <h3 className="font-semibold text-white">
                    SSD
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Flash bellek kullanan, hareketli mekanik parçası
                    olmayan depolama teknolojisidir.
                  </p>
                </div>
              </div>
            </section>

            {/* 05 - BİRLİKTE ÇALIŞMA */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                05 · Birlikte Çalışma
              </div>

              <h2 className="text-2xl font-semibold">
                Bir Program Çalıştırıldığında Ne Olur?
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                Örneğin bilgisayarında Google Chrome&apos;u açtığını
                düşün. Sen yalnızca simgeye tıklarsın fakat arka
                planda farklı bileşenler birlikte çalışır.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <pre className="text-sm leading-7 text-cyan-300">
{`Chrome dosyaları
       │
       ▼
      DİSK
       │
       │ Gerekli veriler yüklenir
       ▼
      RAM
       │
       │ İşlenecek veriler
       ▼
      CPU
       │
       │ İşlemler gerçekleştirilir
       ▼
     Sonuç
       │
       ▼
     Ekran`}
                </pre>
              </div>
            </section>

            {/* QUIZ */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                🧠 Mini Quiz
              </div>

              <h2 className="text-2xl font-semibold">
                Öğrendiklerini Test Et
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Tüm soruları doğru cevapla.
              </p>

              <div className="mt-6 space-y-8">
                {questions.map((question, questionIndex) => {
                  const selected = answers[questionIndex];
                  const answered = selected !== undefined;
                  const correct = selected === question.answer;

                  return (
                    <div
                      key={question.question}
                      className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                    >
                      <p className="font-semibold text-white">
                        {questionIndex + 1}. {question.question}
                      </p>

                      <div className="mt-4 space-y-2">
                        {question.options.map((option) => {
                          const isSelected = selected === option;
                          const isCorrect = option === question.answer;

                          let className =
                            "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-cyan-500";

                          if (answered && isSelected && isCorrect) {
                            className =
                              "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                          }

                          if (answered && isSelected && !isCorrect) {
                            className =
                              "border-red-500 bg-red-500/10 text-red-400";
                          }

                          return (
                            <button
                              key={option}
                              disabled={answered}
                              onClick={() =>
                                handleAnswer(questionIndex, option)
                              }
                              className={`w-full rounded-lg border p-3 text-left text-sm transition ${className}`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {answered && (
                        <div
                          className={`mt-4 rounded-lg p-3 text-sm ${
                            correct
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {correct
                            ? "✓ Doğru cevap!"
                            : `✕ Yanlış. Doğru cevap: ${question.answer}`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {quizCompleted && (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <p className="font-semibold text-emerald-400">
                    ✓ Quiz tamamlandı!
                  </p>

                  <p className="mt-2 text-sm text-zinc-300">
                    Dersin uygulama bölümüne geçebilirsin.
                  </p>

                  <div className="mt-3 font-bold text-cyan-400">
                    +30 XP
                  </div>
                </div>
              )}
            </section>

            {/* LAB */}
            <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                🧪 Uygulama 02
              </div>

              <h2 className="text-2xl font-semibold">
                Sistemini Tanı
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Kendi bilgisayarındaki CPU, RAM ve disk bilgilerini
                bul. Bu uygulamanın amacı sistem bileşenlerini
                tanımaya başlamaktır.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "CPU modelimi buldum",
                  "RAM miktarımı buldum",
                  "Disk türümü buldum",
                  "Disk kapasitemi buldum",
                ].map((label, index) => (
                  <label
                    key={label}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      taskChecks[index]
                        ? "border-emerald-500/50 bg-emerald-500/10"
                        : "border-zinc-800 bg-zinc-900 hover:border-cyan-500/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={taskChecks[index]}
                      onChange={() => handleTaskCheck(index)}
                      disabled={taskCompleted}
                      className="h-4 w-4 accent-cyan-400"
                    />

                    <span className="text-sm text-zinc-300">
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">
                    İlerleme
                  </span>

                  <span className="text-cyan-400">
                    {taskChecks.filter(Boolean).length}/4
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-cyan-400 transition-all"
                    style={{
                      width: `${(taskChecks.filter(Boolean).length / 4) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={completeTask}
                disabled={!taskReady || taskCompleted}
                className={`mt-6 w-full rounded-xl px-5 py-4 font-semibold transition ${
                  taskReady && !taskCompleted
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                }`}
              >
                {taskCompleted
                  ? "✓ Görev Tamamlandı"
                  : taskReady
                  ? "Görevi Tamamla"
                  : "Tüm Maddeleri Tamamla"}
              </button>

              {taskCompleted && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="font-semibold text-emerald-400">
                    ✓ Uygulama tamamlandı!
                  </p>

                  <div className="mt-2 font-bold text-cyan-400">
                    +20 XP
                  </div>
                </div>
              )}
            </section>

            {/* COMPLETE */}
            <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Ders Sonu
              </div>

              <h2 className="mt-2 text-2xl font-semibold">
                Ders 02&apos;yi tamamladın mı?
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                CPU, RAM ve disk arasındaki temel farkları
                öğrendiysen bir sonraki derse geçebilirsin.
              </p>

              <button
                disabled={!lessonCompleted}
                className={`mt-5 w-full rounded-xl px-5 py-4 font-semibold transition ${
                  lessonCompleted
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                }`}
              >
                {lessonCompleted
                  ? "✓ Dersi Tamamla"
                  : "Önce Quiz ve Uygulamayı Tamamla"}
              </button>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            {/* İLERLEME */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Ders İlerlemesi
              </div>

              <div className="mt-2 text-3xl font-bold">
                {lessonCompleted ? "100%" : quizCompleted ? "75%" : "25%"}
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-cyan-400 transition-all"
                  style={{
                    width: lessonCompleted
                      ? "100%"
                      : quizCompleted
                      ? "75%"
                      : "25%",
                  }}
                />
              </div>

              <div className="mt-2 text-right text-xs text-zinc-500">
                Ders 02
              </div>
            </div>

            {/* İÇİNDEKİLER */}
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                İçindekiler
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="text-cyan-400">
                  01 — Temel Kavramlar
                </div>

                <div className="text-zinc-500">
                  02 — CPU
                </div>

                <div className="text-zinc-500">
                  03 — RAM
                </div>

                <div className="text-zinc-500">
                  04 — Disk
                </div>

                <div className="text-zinc-500">
                  05 — Birlikte Çalışma
                </div>

                <div className="text-zinc-500">
                  06 — Mini Quiz
                </div>

                <div className="text-zinc-500">
                  07 — Uygulama
                </div>
              </div>
            </div>

            {/* XP */}
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Kazanılabilir XP
              </div>

              <div className="mt-2 text-2xl font-bold text-cyan-400">
                +50 XP
              </div>

              <p className="mt-2 text-xs text-zinc-500">
                Quiz + uygulama
              </p>
            </div>

            {/* NAVIGATION */}
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Ders Navigasyonu
              </div>

              <Link
                href="/lessons/01"
                className="mt-4 block rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 transition hover:border-cyan-500 hover:text-cyan-400"
              >
                ← Ders 01
              </Link>

              <Link
                href="/"
                className="mt-2 block rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 transition hover:border-cyan-500 hover:text-cyan-400"
              >
                🏠 Ana Sayfa
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}