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
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#b7ff3c]">
        // RESPONSE REQUIRED
            </div>

            <p className="mb-8 max-w-3xl text-lg font-medium leading-8 text-[#e8ebe6]">
                {task.question}
            </p>

            {task.type === "acknowledgement" && (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        onAnswerChange(
                            answer === task.correctAnswer
                                ? null
                                : task.correctAnswer ??
                                "acknowledged",
                        )
                    }
                    className={`group flex w-full items-center gap-4 border px-6 py-5 text-left transition ${answer === task.correctAnswer
                        ? "border-[#b7ff3c] bg-[#121a0d]"
                        : "border-[#252b29] bg-[#080a0b] hover:border-[#3d4743]"
                        }`}
                >
                    <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center border transition ${answer === task.correctAnswer
                            ? "border-[#b7ff3c] bg-[#b7ff3c]"
                            : "border-[#3d4743]"
                            }`}
                    >
                        {answer === task.correctAnswer && (
                            <span className="font-mono text-xs font-bold text-[#080a0b]">
                                ✓
                            </span>
                        )}
                    </span>

                    <span className="font-mono text-sm tracking-wide text-[#e8ebe6]">
                        Tamamladım ve kontrol ettim.
                    </span>
                </button>
            )}

            {task.type === "single-choice" && (
                <div className="grid gap-px overflow-hidden border border-[#252b29] bg-[#252b29]">
                    {task.options?.map((option, index) => {
                        const selected =
                            answer === option.id;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                    onAnswerChange(option.id)
                                }
                                className={`group grid grid-cols-[28px_16px_minmax(0,1fr)] items-start gap-x-3 px-4 py-4 text-left transition sm:grid-cols-[32px_16px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-4 sm:px-6 ${selected
                                        ? "bg-[#121a0d]"
                                        : "bg-[#080a0b] hover:bg-[#0d1011]"
                                    }`}
                            >
                                <span
                                    className={`pt-[2px] font-mono text-xs sm:pt-0 ${selected
                                            ? "text-[#b7ff3c]"
                                            : "text-[#59615d]"
                                        }`}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span
                                    className={`mt-[2px] flex h-4 w-4 items-center justify-center border sm:mt-0 ${selected
                                            ? "border-[#b7ff3c]"
                                            : "border-[#3d4743]"
                                        }`}
                                >
                                    {selected && (
                                        <span className="h-2 w-2 bg-[#b7ff3c]" />
                                    )}
                                </span>

                                <span
                                    className={`min-w-0 text-sm leading-6 ${selected
                                            ? "font-medium text-[#e8ebe6]"
                                            : "text-[#a8b0ab]"
                                        }`}
                                >
                                    {option.label}
                                </span>

                                {selected && (
                                    <span className="col-start-3 mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#b7ff3c] sm:col-start-4 sm:mt-0 sm:text-[10px] sm:tracking-[0.2em]">
                                        [selected]
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {task.type === "number" && (
                <ResponseInput
                    type="number"
                    value={answer}
                    placeholder={task.placeholder}
                    disabled={disabled}
                    onChange={onAnswerChange}
                />
            )}

            {(task.type === "text" ||
                task.type === "observation") && (
                    <ResponseInput
                        type="text"
                        value={answer}
                        placeholder={task.placeholder}
                        disabled={disabled}
                        onChange={onAnswerChange}
                    />
                )}

            {task.type === "reflection" && (
                <div className="relative">
                    <textarea
                        value={answer ?? ""}
                        placeholder={task.placeholder}
                        disabled={disabled}
                        rows={6}
                        onChange={(event) =>
                            onAnswerChange(
                                event.target.value,
                            )
                        }
                        style={{
                            fontFamily:
                                'Consolas, Monaco, "Courier New", monospace',
                        }}
                        className="w-full resize-y border border-[#252b29] bg-[#080a0b] p-5 text-sm leading-7 text-[#b7ff3c] outline-none transition placeholder:text-[#4d5551] focus:border-[#b7ff3c] disabled:opacity-60"
                    />
                    <div className="absolute right-4 bottom-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#59615d]">
                        reflection / usr
                    </div>
                </div>
            )}
        </div>
    );
}

interface ResponseInputProps {
    type: "text" | "number";
    value: LabAnswerValue;
    placeholder?: string;
    disabled: boolean;
    onChange: (
        answer: LabAnswerValue,
    ) => void;
}

function ResponseInput({
    type,
    value,
    placeholder,
    disabled,
    onChange,
}: ResponseInputProps) {
    const quickNumbers =
        type === "number"
            ? [2, 4, 6, 8, 12, 16, 24, 32]
            : [];

    return (
        <div>
            {type === "number" && (
                <div className="mb-3">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#59615d]">
                        QUICK SELECT
                    </div>

                    <div className="grid w-full grid-cols-4 gap-2 sm:grid-cols-8">

                        {quickNumbers.map((number) => {
                            const selected =
                                String(value) === String(number);

                            return (
                                <button
                                    key={number}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() =>
                                        onChange(String(number))
                                    }
                                    className={`h-12 border font-mono text-sm transition ${selected
                                        ? "border-[#b7ff3c] bg-[#b7ff3c] font-bold text-[#080a0b]"
                                        : "border-[#343b38] bg-[#080a0b] text-[#a8b0ab] hover:border-[#b7ff3c] hover:text-[#b7ff3c]"
                                        }`}
                                >
                                    {number}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="relative">
                <input
                    type={type}
                    value={value ?? ""}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(event) =>
                        onChange(
                            event.target.value,
                        )
                    }
                    style={{
                        fontFamily:
                            'Consolas, Monaco, "Courier New", monospace',
                    }}
                    className="w-full border border-[#252b29] bg-[#080a0b] px-5 py-4 pr-32 text-sm text-[#b7ff3c] outline-none transition placeholder:text-[#4d5551] focus:border-[#b7ff3c] disabled:opacity-60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#59615d]">
                    {type === "number"
                        ? "NUM / USR"
                        : "INPUT / USR"}
                </div>
            </div>
        </div>
    );
}