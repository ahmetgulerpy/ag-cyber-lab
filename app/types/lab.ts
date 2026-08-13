export type LabDifficulty =
  | "guided"
  | "challenge"
  | "investigation";

export type LabEnvironment =
  | "local"
  | "browser"
  | "simulation"
  | "container";

export type LabSafetyLevel =
  | "safe"
  | "caution"
  | "restricted";

export type LabTaskType =
  | "acknowledgement"
  | "text"
  | "number"
  | "single-choice"
  | "observation"
  | "reflection";

export type LabValidationMode =
  | "non-empty"
  | "positive-number"
  | "self-observation"
  | "reflection"
  | "exact";

export interface LabHint {
  level: 1 | 2 | 3;
  title: string;
  text: string;
}

export interface LabOption {
  id: string;
  label: string;
}

export interface LabValidation {
  mode: LabValidationMode;

  minLength?: number;

  min?: number;

  max?: number;

  acceptedAnswers?: string[];

  selfCheck?: string[];
}

export interface LabTask {
  id: string;

  type: LabTaskType;

  title: string;

  instruction: string;

  question: string;

  placeholder?: string;

  options?: LabOption[];

  correctAnswer?: string;

  validation?: LabValidation;

  skills: string[];

  points: number;

  hints: LabHint[];
}

export interface LabSafety {
  level: LabSafetyLevel;
  message: string;
}

export interface LabCompletion {
  minimumScore: number;

  allowRetry: boolean;

  showSkillBreakdown: boolean;
}

export interface LabDefinition {
  id: string;

  slug: string;

  moduleId: string;

  lessonIds: string[];

  title: string;

  subtitle?: string;

  description: string;

  difficulty: LabDifficulty;

  environment: LabEnvironment;

  estimatedMinutes: number;

  xp: number;

  skills: string[];

  requirements: string[];

  safety: LabSafety;

  objectives: string[];

  tasks: LabTask[];

  completion: LabCompletion;
}

/*
|--------------------------------------------------------------------------
| Runtime Progress Types
|--------------------------------------------------------------------------
|
| Yukarıdaki interface'ler lab içeriğinin kendisini tanımlar.
|
| Aşağıdaki interface'ler ise öğrencinin lab sırasında oluşturduğu
| ilerleme verisini temsil eder.
|
*/

export type LabAnswerValue =
  | string
  | number
  | null;

export interface LabTaskProgress {
  taskId: string;

  answer: LabAnswerValue;

  completed: boolean;

  correct: boolean | null;

  earnedPoints: number;

  attempts: number;

  usedHints: number[];

  selfCheckCompleted?: boolean[];

  startedAt?: string;

  completedAt?: string;
}

export interface LabProgress {
  labId: string;

  currentTaskIndex: number;

  startedAt: string;

  updatedAt: string;

  completedAt?: string;

  completed: boolean;

  score: number;

  maxScore: number;

  percentage: number;

  hintsUsed: number;

  attempts: number;

  tasks: Record<string, LabTaskProgress>;
}

/*
|--------------------------------------------------------------------------
| Lab Result
|--------------------------------------------------------------------------
|
| Lab tamamlandıktan sonra kullanıcıya göstereceğimiz özet sonuç.
|
*/

export interface LabSkillResult {
  skill: string;

  earnedPoints: number;

  maxPoints: number;

  percentage: number;
}

export interface LabResult {
  labId: string;

  score: number;

  maxScore: number;

  percentage: number;

  passed: boolean;

  hintsUsed: number;

  attempts: number;

  skills: LabSkillResult[];
}