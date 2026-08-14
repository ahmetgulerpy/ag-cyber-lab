import Link from "next/link";

import { listLessons } from "@/lib/lessons/loader";

import LessonCatalog from "@/app/components/lessons/LessonCatalog";

export default function LessonsPage() {
  const lessons = listLessons();

  return (
    <main className="min-h-screen bg-[#080a0b] text-[#e8ebe6]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <header className="border-b border-[#252b29] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b7ff3c]">
                AG / LEARNING SYSTEM
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#b7ff3c]" />

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#59615d]">
                  TRAINING CATALOG / ONLINE
                </span>
              </div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
              MODULE 01 / 12 ENTRIES
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-[#e8ebe6] sm:text-4xl">
              Lessons
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8d9691] sm:text-base">
              Temel bilgiyi adım adım inşa et.
              Her ders bir öncekinin üzerine
              kurulur.
            </p>
          </div>
        </header>

        <section className="py-8">
          <LessonCatalog
            lessons={lessons}
          />
        </section>

        <footer className="border-t border-[#252b29] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#59615d]">
            <span>
              AG CYBER LAB / TRAINING SYSTEM
            </span>

            <span>
              CATALOG STATUS / OPERATIONAL
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}