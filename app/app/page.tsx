const modules = [
  {
    number: "01",
    title: "Bilgisayar ve Siber Güvenlik Temelleri",
    description: "Bilgisayarların, işletim sistemlerinin ve temel siber güvenlik kavramlarının çalışma mantığını öğren.",
    progress: 8,
    lessons: 6,
    status: "Devam Ediyor",
  },
  {
    number: "02",
    title: "Ağ Temelleri",
    description: "IP, TCP/IP, DNS, HTTP, portlar ve ağ iletişiminin temel mantığını öğren.",
    progress: 0,
    lessons: 7,
    status: "Yakında",
  },
  {
    number: "03",
    title: "Linux Temelleri",
    description: "Terminal, dosya sistemi, kullanıcılar, izinler ve temel Linux komutlarını öğren.",
    progress: 0,
    lessons: 6,
    status: "Yakında",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080b10] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0b0f15] lg:flex lg:flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-white/10 px-6">
            <div>
              <div className="text-lg font-bold tracking-tight">
                AG <span className="text-cyan-400">Cyber Lab</span>
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Community Edition
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6">
            <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Platform
            </div>

            <div className="space-y-1">
              <NavItem icon="⌂" label="Dashboard" active />
              <NavItem icon="▣" label="Modüller" />
              <NavItem icon="⌘" label="Lablar" />
              <NavItem icon="?" label="Quizler" />
              <NavItem icon="◆" label="Görevler" />
            </div>

            <div className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Öğrenme
            </div>

            <div className="space-y-1">
              <NavItem icon="◔" label="İlerlemem" />
              <NavItem icon="★" label="Başarılar" />
              <NavItem icon="?" label="Yardım" />
            </div>
          </nav>

          {/* User */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-bold text-cyan-400">
                AG
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  Öğrenci
                </div>
                <div className="text-xs text-zinc-500">
                  Başlangıç Seviyesi
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">
          {/* TOP BAR */}
          <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 lg:px-10">
            <div>
              <div className="text-sm text-zinc-500">AG Cyber Lab</div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.06] sm:block">
                Community Edition
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-cyan-400">
                AG
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            {/* HERO */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#101923] via-[#0d131b] to-[#0a0d12] p-7 lg:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />

              <div className="relative max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[11px] font-medium text-cyan-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Öğrenme yolculuğun devam ediyor
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Hoş geldin,{" "}
                  <span className="text-cyan-400">Cyber Learner.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Siber güvenliği sıfırdan öğren, uygulamalarla pekiştir ve
                  gerçek senaryolar üzerinden ilerle.
                </p>

                <div className="mt-7">
                  <button className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
                    Öğrenmeye Devam Et →
                  </button>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Genel İlerleme"
                value="8%"
                description="Tüm eğitim"
                icon="◔"
              />

              <StatCard
                title="Tamamlanan Ders"
                value="1"
                description="60+ ders hedefi"
                icon="✓"
              />

              <StatCard
                title="Tamamlanan Lab"
                value="0"
                description="25+ uygulamalı lab"
                icon="⌘"
              />

              <StatCard
                title="Seri"
                value="1 Gün"
                description="Öğrenmeye devam et"
                icon="★"
              />
            </section>

            {/* CURRENT MODULE */}
            <section className="mt-10">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-400">
                    Başlangıç
                  </div>

                  <h3 className="mt-1 text-xl font-bold">
                    Eğitim Modülleri
                  </h3>
                </div>

                <button className="text-xs text-zinc-500 transition hover:text-white">
                  Tümünü Gör →
                </button>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                {modules.map((module) => (
                  <ModuleCard key={module.number} module={module} />
                ))}
              </div>
            </section>

            {/* LEARNING PATH */}
            <section className="mt-10">
              <div className="mb-4">
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-400">
                  Sistem
                </div>

                <h3 className="mt-1 text-xl font-bold">
                  AG Cyber Lab Öğrenme Sistemi
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FeatureCard
                  icon="▤"
                  title="Ders"
                  text="Konuyu öğren ve temel bilgileri kazan."
                />

                <FeatureCard
                  icon="?"
                  title="Quiz"
                  text="Öğrendiklerini test ederek bilgini ölç."
                />

                <FeatureCard
                  icon="⌘"
                  title="Uygulama"
                  text="Bilgiyi gerçek sistemler üzerinde uygula."
                />

                <FeatureCard
                  icon="◆"
                  title="Görev"
                  text="Senaryoyu çöz ve öğrendiklerini kullan."
                />
              </div>
            </section>

            {/* HINT SYSTEM PREVIEW */}
            <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1017]">
              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-400">
                    ?
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Hint System
                    </h3>

                    <p className="text-xs text-zinc-500">
                      Takıldığında adım adım yardım al.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-6 sm:grid-cols-3">
                <HintPreview
                  number="01"
                  title="Yönlendir"
                  text="İlk adımı bulmana yardımcı olur."
                />

                <HintPreview
                  number="02"
                  title="İpucu Ver"
                  text="Problemin önemli kısmına dikkat çeker."
                />

                <HintPreview
                  number="03"
                  title="Çözümü Aç"
                  text="Son çare olarak çözüm yolunu gösterir."
                />
              </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-zinc-600">
              AG Cyber Lab — Community Edition
              <span className="mx-2">•</span>
              Learn. Practice. Investigate.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? "bg-cyan-400/10 text-cyan-400"
          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
      }`}
    >
      <span className="flex w-5 justify-center text-sm">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0b1017] p-5 transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-zinc-500">{title}</div>
          <div className="mt-2 text-2xl font-bold">{value}</div>
          <div className="mt-1 text-xs text-zinc-600">{description}</div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>
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
    progress: number;
    lessons: number;
    status: string;
  };
}) {
  const active = module.progress > 0;

  return (
    <div className="group rounded-xl border border-white/10 bg-[#0b1017] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-sm text-cyan-400">
          {module.number}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
            active
              ? "bg-cyan-400/10 text-cyan-400"
              : "bg-white/[0.05] text-zinc-600"
          }`}
        >
          {module.status}
        </span>
      </div>

      <h4 className="mt-5 min-h-[48px] text-base font-semibold leading-6">
        {module.title}
      </h4>

      <p className="mt-2 min-h-[72px] text-xs leading-5 text-zinc-500">
        {module.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="text-zinc-600">
            {module.lessons} ders
          </span>

          <span className="text-zinc-400">
            {module.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all"
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>

      <button
        className={`mt-5 w-full rounded-lg py-2.5 text-xs font-semibold transition ${
          active
            ? "bg-cyan-400 text-black hover:bg-cyan-300"
            : "border border-white/10 text-zinc-600"
        }`}
      >
        {active ? "Devam Et →" : "Yakında"}
      </button>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0b1017] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <h4 className="mt-4 text-sm font-semibold">{title}</h4>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        {text}
      </p>
    </div>
  );
}

function HintPreview({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        <div className="font-mono text-xs text-yellow-400">
          HINT {number}
        </div>
      </div>

      <div className="mt-3 text-sm font-medium">
        {title}
      </div>

      <p className="mt-1 text-xs leading-5 text-zinc-600">
        {text}
      </p>
    </div>
  );
}