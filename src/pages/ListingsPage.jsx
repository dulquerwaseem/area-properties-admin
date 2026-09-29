import { useState } from "react";
import { Plus, Search, Eye, Pencil } from "lucide-react";
import PillButton from "../components/PillButton";
import StatCard from "../components/StatCard";
import { formatPrice } from "../lib/utils";

export default function ListingsPage({ listings, onAdd }) {
  const [query, setQuery] = useState("");
  const filtered = listings.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()) || l.locality.toLowerCase().includes(query.toLowerCase()));
  const published = listings.filter((l) => l.status === "Published").length;
  const drafts = listings.filter((l) => l.status === "Draft").length;
  const totalViews = listings.reduce((s, l) => s + l.views, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Listings</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{listings.length} total properties</p>
        </div>
        <PillButton onClick={onAdd} variant="accent"><Plus className="w-4 h-4" /> Add property</PillButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total listings" value={listings.length} />
        <StatCard label="Published" value={published} />
        <StatCard label="Drafts" value={drafts} />
        <StatCard label="Total views" value={totalViews.toLocaleString("en-IN")} />
      </div>

      <div className="flex items-center gap-2 mb-4 px-3.5 py-2.5 rounded-xl bg-neutral-50 max-w-sm">
        <Search className="w-4 h-4 text-neutral-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search listings" className="bg-transparent outline-none text-sm w-full" />
      </div>

      <div className="rounded-2xl border border-neutral-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 text-left text-neutral-500">
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Views</th>
              <th className="px-4 py-3 font-medium">Added</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-neutral-100">
                <td className="px-4 py-3">
                  <div className="font-medium text-neutral-900 line-clamp-1 max-w-xs">{l.title}</div>
                  <div className="text-xs text-neutral-400">{l.locality}, Bengaluru {l.zone}</div>
                </td>
                <td className="px-4 py-3 text-neutral-700 tabular-nums whitespace-nowrap">{formatPrice(l.price)}</td>
                <td className="px-4 py-3 text-neutral-500">{l.type}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${l.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${l.status === "Published" ? "bg-emerald-500" : "bg-neutral-400"}`} />
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500">{l.views}</td>
                <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">{l.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button className="hover:text-neutral-900"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-neutral-900"><Pencil className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-400 text-sm">No listings match your search.</div>
        )}
      </div>
    </div>
  );
}
