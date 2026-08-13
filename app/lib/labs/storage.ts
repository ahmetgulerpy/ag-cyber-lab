import type {
  LabProgress,
} from "@/types/lab";

const STORAGE_PREFIX =
  "ag-cyber-lab:progress:";

function getStorageKey(
  labId: string,
): string {
  return `${STORAGE_PREFIX}${labId}`;
}

export function saveLabProgress(
  progress: LabProgress,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getStorageKey(progress.labId),
      JSON.stringify(progress),
    );
  } catch {
    // Storage kullanılamıyorsa
    // lab memory üzerinde çalışmaya devam eder.
  }
}

export function loadLabProgress(
  labId: string,
): LabProgress | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored =
      window.localStorage.getItem(
        getStorageKey(labId),
      );

    if (!stored) {
      return null;
    }

    return JSON.parse(
      stored,
    ) as LabProgress;
  } catch {
    return null;
  }
}

export function removeLabProgress(
  labId: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(
      getStorageKey(labId),
    );
  } catch {
    // Silme başarısız olsa bile
    // UI çalışmaya devam eder.
  }
}