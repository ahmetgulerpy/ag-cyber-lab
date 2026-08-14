import Link from "next/link";

import { loadLab } from "@/lib/labs/loader";

export default function LabsPage() {
  const lab = loadLab(
    "module-01",
    "lab-01-know-your-machine.json",
  );

  return (
    <main className="min-h-screen bg-[#080a0b] text-[#e8ebe6]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Catalog Header */}
        <header className="border-b border-[#252b29] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b7ff3c]">
                AG / LAB SYSTEM
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#b7ff3c]" />

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#59615d]">
                  TRAINING CATALOG / ONLINE
                </span>
              </div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
              AVAILABLE / 01
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-[#e8ebe6] sm:text-4xl">
              Lab Operations
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8d9691] sm:text-base">
              Uygulamalı görevlerle sistemini tanı, gözlem yap
              ve teknik kararlarını doğrula.
            </p>
          </div>
        </header>

        {/* Catalog */}
        <section className="py-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#59615d]">
              MODULE 01 / LABS
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
              01 ENTRY
            </div>
          </div>

          <Link
            href="/labs/01"
            className="group block border border-[#252b29] bg-[#0b0e0d] transition hover:border-[#4a554f]"
          >
            {/* Lab row header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#252b29] px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-[#405828] bg-[#10160c] px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#b7ff3c]">
                  LAB {lab.id}
                </span>

                <span className="border border-[#343b38] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8d9691]">
                  {lab.difficulty}
                </span>

                <span className="border border-[#343b38] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#8d9691]">
                  {lab.environment}
                </span>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#59615d]">
                ~{lab.estimatedMinutes} DK
              </span>
            </div>

            {/* Lab content */}
            <div className="grid gap-8 px-5 py-6 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="min-w-0">
                <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#59615d]">
                  TRAINING UNIT / M01
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-[#e8ebe6] transition group-hover:text-[#b7ff3c] sm:text-2xl">
                  {lab.title}
                </h2>

                {lab.subtitle && (
                  <p className="mt-2 text-sm leading-6 text-[#8d9691]">
                    {lab.subtitle}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#59615d]">
                  <span>
                    TASKS{" "}
                    <strong className="font-normal text-[#a8b0ab]">
                      {String(lab.tasks.length).padStart(2, "0")}
                    </strong>
                  </span>

                  <span>
                    MODE{" "}
                    <strong className="font-normal text-[#a8b0ab]">
                      {lab.difficulty}
                    </strong>
                  </span>

                  <span>
                    ENV{" "}
                    <strong className="font-normal text-[#a8b0ab]">
                      {lab.environment}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b7ff3c]">
                <span>OPEN LAB</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* System Footer */}
        <footer className="border-t border-[#252b29] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
            <span>AG CYBER LAB / TRAINING SYSTEM</span>

            <span>CATALOG STATUS / OPERATIONAL</span>
          </div>
        </footer>
      </div>
    </main>
  );
}