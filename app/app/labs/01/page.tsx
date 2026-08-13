import LabRunner from "@/app/components/labs/LabRunner";
import { loadLab } from "@/lib/labs/loader";

export default function Lab01Page() {
  const lab = loadLab(
    "module-01",
    "lab-01-know-your-machine.json",
  );

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Lab {lab.id}
            </span>

            <span className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs uppercase text-slate-400">
              {lab.difficulty}
            </span>

            <span className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs uppercase text-slate-400">
              {lab.environment}
            </span>

            <span className="font-mono text-xs text-slate-500">
              ~{lab.estimatedMinutes} dk
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {lab.title}
          </h1>

          {lab.subtitle && (
            <p className="mt-2 text-lg text-slate-400">
              {lab.subtitle}
            </p>
          )}
        </header>

        <LabRunner lab={lab} />
      </div>
    </main>
  );
}