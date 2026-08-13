import LabRunner from "@/app/components/labs/LabRunner";
import { loadLab } from "@/lib/labs/loader";

export default function Lab01Page() {
  const lab = loadLab(
    "module-01",
    "lab-01-know-your-machine.json",
  );

  return (
    <main>
      <h1>{lab.title}</h1>

      {lab.subtitle && (
        <p>{lab.subtitle}</p>
      )}

      <LabRunner lab={lab} />
    </main>
  );
}