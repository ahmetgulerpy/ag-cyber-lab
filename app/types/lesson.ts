export interface LessonMeta {
  slug: string;
  fileName: string;
  moduleId: string;
  order: number;
  title: string;
}

export interface LessonDefinition extends LessonMeta {
  content: string;
  totalLessons: number;
  previous: LessonMeta | null;
  next: LessonMeta | null;
}