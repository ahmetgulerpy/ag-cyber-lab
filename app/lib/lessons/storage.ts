import type {
  ModuleLessonProgress,
} from "@/types/lesson-progress";

const STORAGE_KEY =
  "ag-lab-lesson-progress";

export function loadLessonProgress(): ModuleLessonProgress | null {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(
      raw,
    ) as ModuleLessonProgress;
  } catch {
    return null;
  }
}

export function saveLessonProgress(
  progress: ModuleLessonProgress,
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress),
    );
  } catch {
    // storage full or unavailable
  }
}