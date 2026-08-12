"use client";

import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Bilgisayar ve Siber Güvenlik Temelleri",
    description:
      "Bilgisayarların, işletim sistemlerinin ve temel siber güvenlik kavramlarının çalışma mantığını öğren.",
    lessons: 2,
    progress: 50,
    status: "active",
  },
  {
    number: "02",
    title: "İşletim Sistemleri",
    description:
      "Windows ve Linux sistemlerinin temel çalışma mantığını keşfet.",
    lessons: 0,
    progress: 0,
    status: "locked",
  },
  {
    number: "03",
    title: "Ağ Temelleri",
    description:
      "IP, TCP/IP, DNS, HTTP ve ağ iletişiminin temelini öğren.",
    lessons: 0,
    progress: 0,
    status: "locked",
  },
  {
    number: "04",
    title: "Linux Temelleri",
    description:
      "Terminal, dosya sistemi, kullanıcılar, izinler ve temel Linux araçlarını öğren.",
    lessons: 0,
    progress: 0,
    status: "locked",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070a0f] text-white">
      {/* HEADER */}
      <header className="border-b border-zinc-800 bg-[#090d13]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 font-bold text-cyan-400">
              AG
            </div>

            <div>
              <div className="font-bold tracking-wide">
                AG Cyber Lab
              </div>

              <div className="text-xs text-zinc-500">
                Community Edition
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a
              href="#modules"
              className="transition hover:text-white"
            >
              Modüller
            </a>

            <a
              href="#labs"
              className="transition hover:text-white"
            >
              Lablar
            </a>

            <a
              href="#profile"
              className="transition hover:text-white"
            >
              Profil
            </a>

            <a
              href="#leaderboard"
              className="transition hover:text-white"
            >
              Leaderboard
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-xs text-zinc-500">
                Toplam XP
              </div>

              <div className="font-bold text-cyan-400">
                0 XP
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-sm font-bold">
              AG
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Cyber Security Learning Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Siber güvenliği
              <span className="text-cyan-400">
                {" "}
                temelden ileri seviyeye
              </span>{" "}
              öğren.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Teoriyi öğren, uygulamalar yap, labları çöz,
              vakaları analiz et ve kendi siber güvenlik yolculuğunu
              oluştur.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#modules"
                className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                Eğitime Başla
              </a>

              <a
                href="#labs"
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-zinc-200 transition hover:border-zinc-500"
              >
                Labları Keşfet
              </a>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              title="Modül"
              value="12"
              description="Planlanan"
            />

            <Stat
              title="Ders"
              value="60+"
              description="Planlanan"
            />

            <Stat
              title="Lab"
              value="25+"
              description="Planlanan"
            />

            <Stat
              title="Vaka"
              value="10+"
              description="Planlanan"
            />
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Learning Path
          </div>

          <h2 className="mt-2 text-3xl font-bold">
            Eğitim Yol Haritası
          </h2>

          <p className="mt-2 text-zinc-500">
            Temelden başlayıp ileri seviye siber güvenlik
            konularına ilerle.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard
              key={module.number}
              module={module}
            />
          ))}
        </div>
      </section>

      {/* LABS */}
      <section
        id="labs"
        className="border-y border-zinc-800 bg-[#090d13]"
      >
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Practice
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Lab Sistemi
            </h2>

            <p className="mt-2 max-w-2xl text-zinc-500">
              Öğrendiklerini gerçek senaryolara benzeyen
              kontrollü uygulamalar üzerinde test et.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon="🧪"
              title="Uygulamalı Lablar"
              description="Teoriyi terminal ve kontrollü ortamlar üzerinde uygula."
            />

            <FeatureCard
              icon="🎯"
              title="Görevler"
              description="Adım adım görevleri tamamlayarak becerilerini geliştir."
            />

            <FeatureCard
              icon="🏁"
              title="Challenge"
              description="İlerledikçe daha zor senaryoları çöz."
            />
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section
        id="profile"
        className="mx-auto max-w-7xl px-6 py-14"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="grid gap-8 md:grid-cols-[1fr_200px]">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Öğrenci Profili
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                Öğrenme Yolculuğun
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Tamamladığın dersler, çözdüğün lablar ve
                kazandığın XP burada takip edilecek.
              </p>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: "8%" }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-zinc-500">
                <span>İlerleme</span>
                <span>8%</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Seviye
              </div>

              <div className="mt-2 text-4xl font-bold text-cyan-400">
                1
              </div>

              <div className="mt-1 text-sm text-zinc-500">
                Beginner
              </div>

              <div className="mt-4 text-lg font-bold">
                0 XP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section
        id="leaderboard"
        className="border-t border-zinc-800 bg-[#090d13]"
      >
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Community
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Leaderboard
            </h2>

            <p className="mt-2 text-zinc-500">
              İleride öğrenciler XP kazanarak topluluk
              sıralamasında yer alabilecek.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 text-xs uppercase tracking-wider text-zinc-500">
              <span>Oyuncu</span>
              <span>XP</span>
            </div>

            <div className="py-8 text-center text-sm text-zinc-600">
              Leaderboard sistemi yakında aktif olacak.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            AG Cyber Lab — Community Edition
          </div>

          <div>
            Learn · Practice · Analyze
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="text-xs uppercase tracking-wider text-zinc-500">
        {title}
      </div>

      <div className="mt-2 text-3xl font-bold text-cyan-400">
        {value}
      </div>

      <div className="mt-1 text-sm text-zinc-600">
        {description}
      </div>
    </div>
  );
}

function ModuleCard({
  module,
}: {
  module: {
    number: string;
    title: string;
    description: string;
    lessons: number;
    progress: number;
    status: string;
  };
}) {
  const isLocked = module.status === "locked";

  return (
    <div
      className={`rounded-2xl border p-6 transition ${
        isLocked
          ? "border-zinc-800 bg-zinc-950/60"
          : "border-cyan-500/20 bg-zinc-950 hover:border-cyan-500/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-bold ${
              isLocked
                ? "border-zinc-800 bg-zinc-900 text-zinc-600"
                : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
            }`}
          >
            {module.number}
          </div>

          <div>
            <h3
              className={`font-semibold ${
                isLocked ? "text-zinc-600" : "text-white"
              }`}
            >
              {module.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {module.description}
            </p>
          </div>
        </div>

        {isLocked && (
          <span className="text-lg text-zinc-700">
            🔒
          </span>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-zinc-600">
            {module.lessons} ders
          </span>

          <span className="text-zinc-600">
            {module.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
          <div
            className="h-full bg-cyan-400"
            style={{
              width: `${module.progress}%`,
            }}
          />
        </div>
      </div>

      {!isLocked && (
        <Link
          href="/lessons/01"
          className="mt-5 block rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-zinc-200 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          Modülü Aç
        </Link>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}