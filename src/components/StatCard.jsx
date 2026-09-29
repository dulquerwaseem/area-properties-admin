export default function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-neutral-100 p-4">
      <div className="text-2xl font-semibold text-neutral-900 tabular-nums">{value}</div>
      <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
    </div>
  );
}
