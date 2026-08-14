import fs from "node:fs";
import path from "node:path";

import type {
  LessonDefinition,
  LessonMeta,
} from "@/types/lesson";

const MODULES_ROOT = path.resolve(
  process.cwd(),
  "..",
  "modules",
);

export const DEFAULT_MODULE_ID =
  "01-computer-and-cybersecurity-basics";

const LESSON_FILE_PATTERN =
  /^lesson-(\d+)-.*\.md$/;

function resolveModuleDir(
  moduleId: string,
): string {
  const dir = path.join(
    MODULES_ROOT,
    moduleId,
  );

  if (!fs.existsSync(dir)) {
    throw new Error(
      `Modül klasörü bulunamadı: ${dir}`,
    );
  }

  return dir;
}

/*
 * Markdown içindeki ilk H1 başlığı ders
 * başlığı olarak kullanılır.
 */
function extractTitle(
  raw: string,
  fallback: string,
): string {
  const match = raw.match(/^#\s+(.+)$/m);

  return match
    ? match[1].trim()
    : fallback;
}

/*
 * Başlık sayfa header'ında gösterildiği için
 * içerikten yalnızca ilk H1 çıkarılır.
 */
function stripTitle(raw: string): string {
  return raw
    .replace(/^#\s+.+$/m, "")
    .trimStart();
}

export function listLessons(
  moduleId: string = DEFAULT_MODULE_ID,
): LessonMeta[] {
  const dir = resolveModuleDir(moduleId);

  return fs
    .readdirSync(dir)
    .filter((fileName) =>
      LESSON_FILE_PATTERN.test(fileName),
    )
    .sort()
    .map((fileName) => {
      const slug = fileName.replace(
        /\.md$/,
        "",
      );

      const orderMatch =
        fileName.match(
          LESSON_FILE_PATTERN,
        );

      const raw = fs.readFileSync(
        path.join(dir, fileName),
        "utf-8",
      );

      return {
        slug,
        fileName,
        moduleId,
        order: orderMatch
          ? Number(orderMatch[1])
          : 0,
        title: extractTitle(raw, slug),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function loadLesson(
  slug: string,
  moduleId: string = DEFAULT_MODULE_ID,
): LessonDefinition {
  const lessons = listLessons(moduleId);

  const index = lessons.findIndex(
    (lesson) => lesson.slug === slug,
  );

  /*
   * Slug yalnızca listelenen dersler
   * içinden eşleştirilir.
   */
  if (index === -1) {
    throw new Error(
      `Ders bulunamadı: ${slug}`,
    );
  }

  const meta = lessons[index];

  const raw = fs.readFileSync(
    path.join(
      resolveModuleDir(moduleId),
      meta.fileName,
    ),
    "utf-8",
  );

  return {
    ...meta,
    content: stripTitle(raw),
    totalLessons: lessons.length,
    previous: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
  };
}