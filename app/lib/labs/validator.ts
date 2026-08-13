import type {
  LabAnswerValue,
  LabTask,
} from "@/types/lab";

export interface ValidationResult {
  valid: boolean;
  correct: boolean | null;
  canContinue: boolean;
  message?: string;
}

function hasValue(answer: LabAnswerValue): boolean {
  if (answer === null) {
    return false;
  }

  if (typeof answer === "string") {
    return answer.trim().length > 0;
  }

  if (typeof answer === "number") {
    return Number.isFinite(answer);
  }

  return false;
}

function normalizeAnswer(value: LabAnswerValue): string {
  if (value === null) {
    return "";
  }

  return String(value)
    .trim()
    .toLocaleLowerCase("tr-TR");
}

export function validateTask(
  task: LabTask,
  answer: LabAnswerValue,
): ValidationResult {
  /* --------------------------------------------------
   * 1. Önce cevap var mı?
   * -------------------------------------------------- */
  if (!hasValue(answer)) {
    return {
      valid: false,
      correct: null,
      canContinue: false,
      message: "Devam etmeden önce bir cevap gir.",
    };
  }

  /* --------------------------------------------------
   * 2. Task doğrudan correctAnswer taşıyorsa
   * -------------------------------------------------- */
  if (task.correctAnswer !== undefined) {
    const userAnswer = normalizeAnswer(answer);
    const correctAnswer = normalizeAnswer(task.correctAnswer);

    const correct = userAnswer === correctAnswer;

    return {
      valid: true,
      correct,
      canContinue: correct,
      message: correct
        ? "Doğru. Devam edebilirsin."
        : "Bu cevap henüz doğru değil. Tekrar düşün veya bir ipucu kullan.",
    };
  }

  /* --------------------------------------------------
   * 3. Validation tanımlanmamışsa
   * -------------------------------------------------- */
  if (!task.validation) {
    return {
      valid: true,
      correct: null,
      canContinue: true,
    };
  }

  const validation = task.validation;

  /* --------------------------------------------------
   * 4. Validation mode'ları
   * -------------------------------------------------- */
  switch (validation.mode) {
    case "non-empty": {
      const text = String(answer).trim();
      const minimumLength = validation.minLength ?? 1;

      if (text.length < minimumLength) {
        return {
          valid: false,
          correct: null,
          canContinue: false,
          message: `Cevabın en az ${minimumLength} karakter olmalı.`,
        };
      }

      return {
        valid: true,
        correct: null,
        canContinue: true,
        message: "Gözlemin kaydedildi.",
      };
    }

    case "positive-number": {
      const numericValue =
        typeof answer === "number"
          ? answer
          : Number(String(answer).replace(",", "."));

      if (!Number.isFinite(numericValue)) {
        return {
          valid: false,
          correct: null,
          canContinue: false,
          message: "Geçerli bir sayı gir.",
        };
      }

      const minimum = validation.min ?? 0;

      if (numericValue < minimum) {
        return {
          valid: false,
          correct: null,
          canContinue: false,
          message: `Değer ${minimum} veya daha büyük olmalı.`,
        };
      }

      if (
        validation.max !== undefined &&
        numericValue > validation.max
      ) {
        return {
          valid: false,
          correct: null,
          canContinue: false,
          message: `Değer ${validation.max} veya daha küçük olmalı.`,
        };
      }

      return {
        valid: true,
        correct: null,
        canContinue: true,
        message: "Gözlemin kaydedildi.",
      };
    }

    case "exact": {
      const acceptedAnswers = validation.acceptedAnswers ?? [];
      const normalizedUserAnswer = normalizeAnswer(answer);
      const correct = acceptedAnswers.some(
        (acceptedAnswer) =>
          normalizeAnswer(acceptedAnswer) === normalizedUserAnswer,
      );

      return {
        valid: true,
        correct,
        canContinue: correct,
        message: correct
          ? "Doğru. Devam edebilirsin."
          : "Bu cevap henüz doğru değil. Tekrar düşün veya bir ipucu kullan.",
      };
    }

    default:
      return {
        valid: true,
        correct: null,
        canContinue: true,
      };
  }
}