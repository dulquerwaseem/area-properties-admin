import { MapPin } from "lucide-react";
import { AMENITY_STYLE } from "../lib/constants";

export default function AmenityCard({ a }) {
  const style = AMENITY_STYLE[a.type] || { icon: MapPin, bg: "bg-neutral-100", text: "text-neutral-500" };
  const Icon = style.icon;
  return (
    <div className={`rounded-2xl aspect-square p-3 flex flex-col items-center justify-center text-center gap-1.5 ${style.bg}`}>
      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
        <Icon className={`w-4 h-4 ${style.text}`} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-neutral-900 leading-snug line-clamp-2">{a.name}</div>
        <div className={`text-xs font-medium mt-0.5 ${style.text}`}>{a.distance}</div>
      </div>
    </div>
  );
}
