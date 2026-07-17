import { Check } from "lucide-react";

const STEPS = [
  { label: "Search", path: "/" },
  { label: "Room", path: "/rooms" },
  { label: "Guest", path: "/guest" },
  { label: "Review", path: "/review" },
];

export default function Stepper({ currentPath }) {
  const step = STEPS.findIndex((s) => s.path === currentPath);

  return (
    <div className="relative mt-6 flex items-center">
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex-1 flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-colors ${
                i < step
                  ? "bg-brass border-brass text-ink"
                  : i === step
                  ? "border-brass text-brass"
                  : "border-paper/25 text-paper/35"
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-medium ${
                i <= step ? "text-paper" : "text-paper/35"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px mx-2 mb-4 border-t border-dashed border-paper/25" />
          )}
        </div>
      ))}
    </div>
  );
}
