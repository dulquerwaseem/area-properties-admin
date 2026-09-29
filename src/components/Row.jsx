export default function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-neutral-900 font-medium text-right">{value}</dd>
    </div>
  );
}
