import { useState, useEffect } from "react";
import { Sparkles, Check, Loader2 } from "lucide-react";
import { GRADIENT } from "../../lib/constants";

export default function GeneratingStep({ onDone }) {
  const [doneSteps, setDoneSteps] = useState(0);
  const steps = ["Reverse geocoding location", "Finding nearby amenities", "Writing SEO title & description", "Tagging photos", "Building schema markup"];

  useEffect(() => {
    if (doneSteps < steps.length) {
      const t = setTimeout(() => setDoneSteps((d) => d + 1), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [doneSteps]);

  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <div className="w-12 h-12 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: GRADIENT }}>
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-8">Generating your listing</h2>
      <div className="space-y-4 text-left">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            {i < doneSteps ? (
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : i === doneSteps ? (
              <Loader2 className="w-5 h-5 text-neutral-400 shrink-0 animate-spin" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-neutral-200 shrink-0" />
            )}
            <span className={i <= doneSteps ? "text-neutral-900 text-sm" : "text-neutral-400 text-sm"}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
