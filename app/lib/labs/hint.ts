import type {
  LabHint,
  LabTask,
} from "@/types/lab";

export interface HintResult {
  hints: LabHint[];
  revealedCount: number;
  canRevealMore: boolean;
  nextHint?: LabHint;
}

/**
 * Task içindeki geçerli hint'leri döndürür.
 *
 * Hint'ler level sırasına göre sıralanır:
 * 1 -> 2 -> 3
 */
function getTaskHints(task: LabTask): LabHint[] {
  return [...task.hints]
    .filter(
      (hint) =>
        hint &&
        typeof hint.title === "string" &&
        typeof hint.text === "string" &&
        hint.title.trim().length > 0 &&
        hint.text.trim().length > 0,
    )
    .sort((a, b) => a.level - b.level);
}

/**
 * Mevcut hint durumunu hesaplar.
 *
 * revealedCount = 0
 * -> henüz hiçbir hint açık değil
 *
 * revealedCount = 1
 * -> ilk hint açık
 *
 * revealedCount = 2
 * -> ilk iki hint açık
 */
export function getHintState(
  task: LabTask,
  revealedCount: number,
): HintResult {
  const allHints = getTaskHints(task);

  const safeRevealedCount = Math.max(
    0,
    Math.min(
      Math.floor(revealedCount),
      allHints.length,
    ),
  );

  const revealedHints = allHints.slice(
    0,
    safeRevealedCount,
  );

  const canRevealMore =
    safeRevealedCount < allHints.length;

  const nextHint = canRevealMore
    ? allHints[safeRevealedCount]
    : undefined;

  return {
    hints: revealedHints,
    revealedCount: safeRevealedCount,
    canRevealMore,
    nextHint,
  };
}

/**
 * Sıradaki hint'i açar.
 */
export function revealNextHint(
  task: LabTask,
  revealedCount: number,
): HintResult {
  const allHints = getTaskHints(task);

  const safeRevealedCount = Math.max(
    0,
    Math.min(
      Math.floor(revealedCount),
      allHints.length,
    ),
  );

  const nextRevealedCount = Math.min(
    safeRevealedCount + 1,
    allHints.length,
  );

  return getHintState(
    task,
    nextRevealedCount,
  );
}

/**
 * Task'in kullanılabilir en az bir hint'i
 * olup olmadığını söyler.
 */
export function hasHints(
  task: LabTask,
): boolean {
  return getTaskHints(task).length > 0;
}

/**
 * Kaç adet hint olduğunu döndürür.
 */
export function getHintCount(
  task: LabTask,
): number {
  return getTaskHints(task).length;
}