import type {
  LabAnswerValue,
  LabDefinition,
  LabProgress,
  LabTask,
  LabTaskProgress,
} from "@/types/lab";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function now(): string {
  return new Date().toISOString();
}

function calculatePercentage(
  score: number,
  maxScore: number,
): number {
  if (maxScore <= 0) {
    return 0;
  }

  return Math.round(
    (score / maxScore) * 100,
  );
}

/*
|--------------------------------------------------------------------------
| Task Progress
|--------------------------------------------------------------------------
*/

export function createTaskProgress(
  task: LabTask,
): LabTaskProgress {
  return {
    taskId: task.id,
    answer: null,
    completed: false,
    correct: null,
    earnedPoints: 0,
    attempts: 0,
    usedHints: [],
  };
}

/*
|--------------------------------------------------------------------------
| Lab Progress
|--------------------------------------------------------------------------
*/

export function createLabProgress(
  lab: LabDefinition,
): LabProgress {
  const tasks: Record<
    string,
    LabTaskProgress
  > = {};

  for (const task of lab.tasks) {
    tasks[task.id] =
      createTaskProgress(task);
  }

  const maxScore = lab.tasks.reduce(
    (total, task) =>
      total + task.points,
    0,
  );

  const timestamp = now();

  return {
    labId: lab.id,
    currentTaskIndex: 0,
    startedAt: timestamp,
    updatedAt: timestamp,
    completed: false,
    score: 0,
    maxScore,
    percentage: 0,
    hintsUsed: 0,
    attempts: 0,
    tasks,
  };
}

/*
|--------------------------------------------------------------------------
| Restore Progress
|--------------------------------------------------------------------------
|
| localStorage'dan gelen eski progress verisini,
| güncel LabDefinition ile güvenli şekilde birleştirir.
|
*/

export function restoreLabProgress(
  lab: LabDefinition,
  stored: LabProgress,
): LabProgress {
  /*
   * Başka bir lab'a ait kayıt kullanılamaz.
   */
  if (stored.labId !== lab.id) {
    return createLabProgress(lab);
  }

  const freshProgress =
    createLabProgress(lab);

  const tasks: Record<
    string,
    LabTaskProgress
  > = {};

  /*
   * Güncel lab JSON'u kaynak kabul edilir.
   *
   * Stored progress'te bulunan task korunur.
   * Sonradan eklenen task fresh progress'ten gelir.
   */
  for (const task of lab.tasks) {
    const freshTask =
      freshProgress.tasks[task.id];

    const storedTask =
      stored.tasks?.[task.id];

    if (!freshTask) {
      continue;
    }

    tasks[task.id] = storedTask
      ? {
          ...freshTask,
          ...storedTask,
          taskId: task.id,

          usedHints: Array.isArray(
            storedTask.usedHints,
          )
            ? storedTask.usedHints
            : [],
        }
      : freshTask;
  }

  /*
   * Puanı stored.score üzerinden almıyoruz.
   * Task'lardan yeniden hesaplıyoruz.
   */
  const score = lab.tasks.reduce(
    (total, task) => {
      const taskProgress =
        tasks[task.id];

      return (
        total +
        (taskProgress?.earnedPoints ?? 0)
      );
    },
    0,
  );

  const maxScore = lab.tasks.reduce(
    (total, task) =>
      total + task.points,
    0,
  );

  const percentage =
    calculatePercentage(
      score,
      maxScore,
    );

  /*
   * Hint ve attempt toplamlarını da task'lardan
   * yeniden hesaplıyoruz.
   */
  const hintsUsed =
    Object.values(tasks).reduce(
      (total, task) =>
        total + task.usedHints.length,
      0,
    );

  const attempts =
    Object.values(tasks).reduce(
      (total, task) =>
        total + task.attempts,
      0,
    );

  /*
   * JSON'daki task sayısı değişmiş olabilir.
   * Index'in sınır dışına çıkmasını engelliyoruz.
   */
  const safeTaskIndex =
    lab.tasks.length > 0
      ? Math.max(
          0,
          Math.min(
            Math.floor(
              stored.currentTaskIndex ?? 0,
            ),
            lab.tasks.length - 1,
          ),
        )
      : 0;

  return {
    ...freshProgress,
    ...stored,

    labId: lab.id,

    currentTaskIndex:
      safeTaskIndex,

    score,
    maxScore,
    percentage,
    hintsUsed,
    attempts,

    tasks,

    /*
     * Tarihler bozuk/eski kayıtta yoksa
     * fresh progress değerleri kullanılır.
     */
    startedAt:
      stored.startedAt ||
      freshProgress.startedAt,

    updatedAt:
      stored.updatedAt ||
      freshProgress.updatedAt,
  };
}

/*
|--------------------------------------------------------------------------
| Answer
|--------------------------------------------------------------------------
*/

export function setTaskAnswer(
  progress: LabProgress,
  taskId: string,
  answer: LabAnswerValue,
): LabProgress {
  const taskProgress =
    progress.tasks[taskId];

  if (!taskProgress) {
    return progress;
  }

  return {
    ...progress,

    updatedAt: now(),

    tasks: {
      ...progress.tasks,

      [taskId]: {
        ...taskProgress,
        answer,
      },
    },
  };
}

/*
|--------------------------------------------------------------------------
| Attempt
|--------------------------------------------------------------------------
*/

export function registerAttempt(
  progress: LabProgress,
  taskId: string,
): LabProgress {
  const taskProgress =
    progress.tasks[taskId];

  if (!taskProgress) {
    return progress;
  }

  const timestamp = now();

  return {
    ...progress,

    attempts:
      progress.attempts + 1,

    updatedAt: timestamp,

    tasks: {
      ...progress.tasks,

      [taskId]: {
        ...taskProgress,

        attempts:
          taskProgress.attempts + 1,

        startedAt:
          taskProgress.startedAt ??
          timestamp,
      },
    },
  };
}

/*
|--------------------------------------------------------------------------
| Hint
|--------------------------------------------------------------------------
*/

export function registerHint(
  progress: LabProgress,
  taskId: string,
  hintLevel: number,
): LabProgress {
  const taskProgress =
    progress.tasks[taskId];

  if (!taskProgress) {
    return progress;
  }

  /*
   * Aynı hint ikinci kez sayılmasın.
   */
  if (
    taskProgress.usedHints.includes(
      hintLevel,
    )
  ) {
    return progress;
  }

  return {
    ...progress,

    hintsUsed:
      progress.hintsUsed + 1,

    updatedAt: now(),

    tasks: {
      ...progress.tasks,

      [taskId]: {
        ...taskProgress,

        usedHints: [
          ...taskProgress.usedHints,
          hintLevel,
        ],
      },
    },
  };
}

/*
|--------------------------------------------------------------------------
| Complete Task
|--------------------------------------------------------------------------
*/

export function completeTask(
  progress: LabProgress,
  task: LabTask,
  correct: boolean | null,
): LabProgress {
  const taskProgress =
    progress.tasks[task.id];

  if (!taskProgress) {
    return progress;
  }

  /*
   * Aynı task ikinci kez puan vermesin.
   */
  if (taskProgress.completed) {
    return progress;
  }

  /*
   * correct === false
   * -> puan verilmez.
   *
   * correct === true
   * -> doğrulanmış doğru cevap.
   *
   * correct === null
   * -> observation/reflection gibi
   *    doğru/yanlış olmayan cevap.
   */
  const earnedPoints =
    correct === false
      ? 0
      : task.points;

  const nextScore =
    progress.score + earnedPoints;

  const timestamp = now();

  return {
    ...progress,

    score: nextScore,

    percentage:
      calculatePercentage(
        nextScore,
        progress.maxScore,
      ),

    updatedAt: timestamp,

    tasks: {
      ...progress.tasks,

      [task.id]: {
        ...taskProgress,

        completed: true,

        correct,

        earnedPoints,

        completedAt: timestamp,

        startedAt:
          taskProgress.startedAt ??
          timestamp,
      },
    },
  };
}

/*
|--------------------------------------------------------------------------
| Current Task
|--------------------------------------------------------------------------
*/

export function setCurrentTaskIndex(
  progress: LabProgress,
  index: number,
  totalTasks: number,
): LabProgress {
  if (totalTasks <= 0) {
    return {
      ...progress,
      currentTaskIndex: 0,
      updatedAt: now(),
    };
  }

  const safeIndex = Math.max(
    0,
    Math.min(
      Math.floor(index),
      totalTasks - 1,
    ),
  );

  return {
    ...progress,

    currentTaskIndex:
      safeIndex,

    updatedAt: now(),
  };
}

/*
|--------------------------------------------------------------------------
| Complete Lab
|--------------------------------------------------------------------------
*/

export function completeLab(
  progress: LabProgress,
): LabProgress {
  if (progress.completed) {
    return progress;
  }

  const timestamp = now();

  return {
    ...progress,

    completed: true,

    completedAt: timestamp,

    updatedAt: timestamp,

    percentage:
      calculatePercentage(
        progress.score,
        progress.maxScore,
      ),
  };
}

/*
|--------------------------------------------------------------------------
| Status Helpers
|--------------------------------------------------------------------------
*/

export function isTaskCompleted(
  progress: LabProgress,
  taskId: string,
): boolean {
  return (
    progress.tasks[taskId]
      ?.completed ?? false
  );
}

export function areAllTasksCompleted(
  progress: LabProgress,
): boolean {
  const tasks =
    Object.values(progress.tasks);

  return (
    tasks.length > 0 &&
    tasks.every(
      (task) => task.completed,
    )
  );
}