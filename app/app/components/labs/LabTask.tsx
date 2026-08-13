"use client";

import type {
  LabAnswerValue,
  LabTask as LabTaskDefinition,
} from "@/types/lab";

interface LabTaskProps {
  task: LabTaskDefinition;
  answer: LabAnswerValue;
  disabled?: boolean;
  onAnswerChange: (
    answer: LabAnswerValue,
  ) => void;
}

export default function LabTask({
  task,
  answer,
  disabled = false,
  onAnswerChange,
}: LabTaskProps) {
  return (
    <div>
      <p>
        <strong>{task.question}</strong>
      </p>

      {task.type === "acknowledgement" && (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <input
      type="checkbox"
      checked={answer === task.correctAnswer}
      disabled={disabled}
      onChange={(event) =>
        onAnswerChange(
          event.target.checked
            ? task.correctAnswer ?? "acknowledged"
            : null,
        )
      }
    />

    <span>
      Tamamladım ve kontrol ettim.
    </span>
  </label>
)}

      {task.type === "single-choice" && (
        <div>
          {task.options?.map((option) => (
            <label
              key={option.id}
              style={{
                display: "block",
                marginBottom: 8,
              }}
            >
              <input
                type="radio"
                name={task.id}
                value={option.id}
                checked={answer === option.id}
                disabled={disabled}
                onChange={() =>
                  onAnswerChange(option.id)
                }
              />

              {" "}
              {option.label}
            </label>
          ))}
        </div>
      )}

      {task.type === "number" && (
        <input
          type="number"
          value={answer ?? ""}
          placeholder={task.placeholder}
          disabled={disabled}
          onChange={(event) =>
            onAnswerChange(
              event.target.value,
            )
          }
        />
      )}

      {(task.type === "text" ||
        task.type === "observation") && (
        <input
          type="text"
          value={answer ?? ""}
          placeholder={task.placeholder}
          disabled={disabled}
          onChange={(event) =>
            onAnswerChange(
              event.target.value,
            )
          }
        />
      )}

      {task.type === "reflection" && (
        <textarea
          value={answer ?? ""}
          placeholder={task.placeholder}
          disabled={disabled}
          rows={5}
          onChange={(event) =>
            onAnswerChange(
              event.target.value,
            )
          }
        />
      )}
    </div>
  );
}