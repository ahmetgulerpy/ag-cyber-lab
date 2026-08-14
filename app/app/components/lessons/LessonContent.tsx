import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({
  content,
}: LessonContentProps) {
  return (
    <div className="max-w-3xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-14 mb-5 border-b border-[#252b29] pb-3 text-2xl font-semibold tracking-tight text-[#e8ebe6]">
              {children}
            </h2>
          ),

          h2: ({ children }) => (
            <h3 className="mt-12 mb-4 text-xl font-semibold tracking-tight text-[#e8ebe6]">
              {children}
            </h3>
          ),

          h3: ({ children }) => (
            <h4 className="mt-9 mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#b7ff3c]">
              {children}
            </h4>
          ),

          p: ({ children }) => (
            <p className="my-5 text-[15px] leading-8 text-[#c3cac5]">
              {children}
            </p>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-[#e8ebe6]">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="text-[#a8b0ab]">
              {children}
            </em>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#b7ff3c] underline underline-offset-4 hover:text-[#c4ff61]"
            >
              {children}
            </a>
          ),

          ul: ({ children }) => (
            <ul className="my-5 space-y-2 pl-1">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="my-5 list-decimal space-y-2 pl-6 marker:font-mono marker:text-[#59615d]">
              {children}
            </ol>
          ),

          li: ({ children, className }) => {
            const isTask =
              typeof className === "string" &&
              className.includes(
                "task-list-item",
              );

            return (
              <li
                className={`text-[15px] leading-7 text-[#c3cac5] ${
                  isTask
                    ? "flex list-none items-start gap-3"
                    : "relative list-none pl-5 before:absolute before:left-0 before:top-[13px] before:h-1 before:w-1 before:bg-[#4a554f]"
                }`}
              >
                {children}
              </li>
            );
          },

          input: ({ checked }) => (
            <span
              aria-hidden="true"
              className={`mt-[6px] flex h-3.5 w-3.5 shrink-0 items-center justify-center border ${
                checked
                  ? "border-[#b7ff3c] bg-[#b7ff3c]"
                  : "border-[#3d4743]"
              }`}
            />
          ),

          blockquote: ({ children }) => (
            <div className="my-7 border-l-2 border-[#b7ff3c] bg-[#0b0e0d] px-5 py-4 text-[15px] leading-7 text-[#a8b0ab] [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
              {children}
            </div>
          ),

          pre: ({ children }) => (
            <div className="my-7 border border-[#252b29] bg-[#0b0e0d]">
              <div className="flex items-center justify-between border-b border-[#252b29] px-4 py-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#59615d]">
                  OUTPUT / REFERENCE
                </span>

                <span className="h-1 w-1 bg-[#3d4743]" />
              </div>

              <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 text-[#b7ff3c] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
                {children}
              </pre>
            </div>
          ),

          code: ({ children }) => (
            <code className="border border-[#252b29] bg-[#10140f] px-1.5 py-0.5 font-mono text-[13px] text-[#b7ff3c]">
              {children}
            </code>
          ),

          table: ({ children }) => (
            <div className="my-7 overflow-x-auto border border-[#252b29]">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-[#0b0e0d]">
              {children}
            </thead>
          ),

          th: ({ children }) => (
            <th className="border-b border-[#252b29] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8d9691]">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border-b border-[#1a1f1d] px-4 py-3 text-[#c3cac5]">
              {children}
            </td>
          ),

          hr: () => (
            <hr className="my-12 border-0 border-t border-[#252b29]" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}