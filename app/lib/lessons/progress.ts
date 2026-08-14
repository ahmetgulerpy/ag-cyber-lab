import type {
  ModuleLessonProgress,
} from "@/types/lesson-progress";

export function createModuleLessonProgress(
  moduleId: string,
): ModuleLessonProgress {
  return {
    moduleId,
    completed: {},
  };
}

export function isLessonCompleted(
  progress: ModuleLessonProgress,
  slug: string,
): boolean {
  return progress.completed[slug] === true;
}

export function toggleLessonComplete(
  progress: ModuleLessonProgress,
  slug: string,
): ModuleLessonProgress {
  const wasCompleted =
    progress.completed[slug] === true;

  return {
    ...progress,
    completed: {
      ...progress.completed,
      [slug]: !wasCompleted,
    },
  };
}

export function getCompletedCount(
  progress: ModuleLessonProgress,
): number {
  return Object.values(
    progress.completed,
  ).filter(Boolean).length;
}