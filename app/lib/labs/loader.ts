import fs from "node:fs";
import path from "node:path";

import type { LabDefinition } from "@/types/lab";

const LABS_ROOT = path.resolve(
  process.cwd(),
  "..",
  "labs",
);

export function loadLab(
  moduleId: string,
  fileName: string,
): LabDefinition {
  const filePath = path.join(
    LABS_ROOT,
    moduleId,
    fileName,
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Lab dosyası bulunamadı: ${filePath}`,
    );
  }

  const raw = fs.readFileSync(
    filePath,
    "utf-8",
  );

  return JSON.parse(raw) as LabDefinition;
}