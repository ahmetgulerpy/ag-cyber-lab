import LabRunner from "@/app/components/labs/LabRunner";
import { loadLab } from "@/lib/labs/loader";

export default function Lab01Page() {
  const lab = loadLab(
    "module-01",
    "lab-01-know-your-machine.json",
  );

  return (
    <main className="min-h-screen bg-[#080a0b] text-[#e8ebe6]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="mb-8 border-b border-[#252b29] pb-6 sm:pb-7">
          {/* Lab Metadata */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="border border-[#b7ff3c] bg-[#10160c] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b7ff3c]">
              LAB {lab.id}
            </span>

            <span className="border border-[#343b38] bg-[#0b0e0d] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a8b0ab]">
              {lab.difficulty}
            </span>

            <span className="border border-[#343b38] bg-[#0b0e0d] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a8b0ab]">
              {lab.environment}
            </span>

            <span className="px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#59615d]">
              ~{lab.estimatedMinutes} DK
            </span>
          </div>

          {/* Lab Identity */}
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#59615d]">
                TRAINING ENVIRONMENT / ACTIVE LAB
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-[#e8ebe6] sm:text-3xl lg:text-4xl">
                {lab.title}
              </h1>

              {lab.subtitle && (
                <p className="mt-2 text-sm leading-6 text-[#8d9691] sm:text-base">
                  {lab.subtitle}
                </p>
              )}
            </div>

            <div
              className="mt-1 hidden shrink-0 items-center gap-2 sm:flex"
              aria-label="System online"
            >
              <span className="h-1.5 w-1.5 bg-[#b7ff3c]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
                SYS / ONLINE
              </span>
            </div>
          </div>
        </header>

        <LabRunner lab={lab} />
      </div>
    </main>
  );
}