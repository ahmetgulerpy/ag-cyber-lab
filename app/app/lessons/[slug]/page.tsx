import Link from "next/link";

import LessonContent from "@/app/components/lessons/LessonContent";
import LessonCompleteButton from "@/app/components/lessons/LessonCompleteButton";

import {
  listLessons,
  loadLesson,
} from "@/lib/lessons/loader";

export function generateStaticParams() {
  return listLessons().map((lesson) => ({
    slug: lesson.slug,
  }));
}

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { slug } = await params;

  const lesson = loadLesson(slug);

  return (
  <main className="min-h-screen bg-[#080a0b] text-[#e8ebe6]">
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <header className="border-b border-[#252b29] pb-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b7ff3c]">
            AG / LEARNING SYSTEM
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#59615d]">
            MODULE 01
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="border border-[#405828] bg-[#10160c] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b7ff3c]">
            LESSON{" "}
            {String(lesson.order).padStart(
              2,
              "0",
            )}
          </span>

          <span className="border border-[#343b38] bg-[#0b0e0d] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a8b0ab]">
            {String(lesson.order).padStart(
              2,
              "0",
            )}{" "}
            /{" "}
            {String(
              lesson.totalLessons,
            ).padStart(2, "0")}
          </span>
        </div>

        <h1 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-[#e8ebe6] sm:text-3xl lg:text-4xl">
          {lesson.title}
        </h1>
      </header>

      <article className="py-10">
        <LessonContent
          content={lesson.content}
        />
      </article>

      <LessonCompleteButton
        moduleId={lesson.moduleId}
        slug={lesson.slug}
        totalLessons={lesson.totalLessons}
      />

      <nav className="mt-6 grid gap-px border border-[#252b29] bg-[#252b29] sm:grid-cols-2">
        {lesson.previous ? (
          <Link
            href={`/lessons/${lesson.previous.slug}`}
            className="group bg-[#0b0e0d] px-5 py-5 transition hover:bg-[#101413]"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#59615d]">
              ← PREVIOUS LESSON
            </div>

            <div className="mt-2 text-sm text-[#a8b0ab] transition group-hover:text-[#e8ebe6]">
              {lesson.previous.title}
            </div>
          </Link>
        ) : (
          <div className="bg-[#0b0e0d] px-5 py-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3d4743]">
              START OF MODULE
            </div>
          </div>
        )}

        {lesson.next ? (
          <Link
            href={`/lessons/${lesson.next.slug}`}
            className="group bg-[#0b0e0d] px-5 py-5 transition hover:bg-[#101413] sm:text-right"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b7ff3c]">
              NEXT LESSON →
            </div>

            <div className="mt-2 text-sm text-[#a8b0ab] transition group-hover:text-[#e8ebe6]">
              {lesson.next.title}
            </div>
          </Link>
        ) : (
          <div className="bg-[#0b0e0d] px-5 py-5 sm:text-right">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3d4743]">
              END OF MODULE
            </div>
          </div>
        )}
      </nav>
    </div>
  </main>
);
}