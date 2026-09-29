export default function Badge({ children, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-600">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
