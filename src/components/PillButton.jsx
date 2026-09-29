import { GRADIENT } from "../lib/constants";

export default function PillButton({ children, onClick, variant = "dark", className = "" }) {
  const base = "inline-flex items-center justify-center gap-1.5 rounded-full font-medium text-sm px-5 py-2.5 transition-colors";
  const variants = {
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 text-neutral-900 hover:border-neutral-900",
  };
  const style = variant === "accent" ? { background: GRADIENT } : undefined;
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] || "text-white hover:opacity-90"} ${className}`} style={style}>
      {children}
    </button>
  );
}
