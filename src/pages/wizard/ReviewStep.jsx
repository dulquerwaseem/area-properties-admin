import { Building2, ChevronLeft, Landmark, Check, Play } from "lucide-react";
import PillButton from "../../components/PillButton";
import Badge from "../../components/Badge";
import AmenityCard from "../../components/AmenityCard";
import Row from "../../components/Row";
import { formatPrice } from "../../lib/utils";

export default function ReviewStep({ form, media, generated, setGenerated, onPublish, onBack }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <button onClick={onBack} className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Back to edit
        </button>
        <div className="flex gap-2">
          <PillButton onClick={() => onPublish("Draft")} variant="outline">Save as draft</PillButton>
          <PillButton onClick={() => onPublish("Published")} variant="dark">Publish listing</PillButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {media.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {media.map((m, i) => (
                <div key={i} className={`relative rounded-xl overflow-hidden bg-neutral-100 ${i === 0 ? "col-span-4 h-56" : "aspect-square"}`}>
                  {m.type === "video" ? (
                    <>
                      <video src={m.src} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
                        <div className={`${i === 0 ? "w-12 h-12" : "w-7 h-7"} rounded-full bg-white flex items-center justify-center`}>
                          <Play className={i === 0 ? "w-5 h-5 text-neutral-900" : "w-3.5 h-3.5 text-neutral-900"} fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={m.src} className="w-full h-full object-cover" alt={generated.altTags[i] || ""} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-56 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-300 mb-6">
              <Building2 className="w-12 h-12" />
            </div>
          )}

          <label className="block text-xs text-neutral-400 mb-1.5">Listing title (generated — edit if needed)</label>
          <input
            value={generated.title}
            onChange={(e) => setGenerated((g) => ({ ...g, title: e.target.value }))}
            className="w-full text-xl font-semibold text-neutral-900 outline-none bg-transparent border-b border-neutral-200 pb-2 mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-5">
            <Badge icon={Landmark}>{form.approval}</Badge>
            <Badge>{form.locality}, Bengaluru {generated.zone}</Badge>
          </div>

          <div className="flex items-baseline gap-3 pb-5 border-b border-neutral-100">
            <span className="text-2xl font-semibold text-neutral-900 tabular-nums">{formatPrice(Number(form.price) || 0)}</span>
            <span className="text-sm text-neutral-400">{form.size} sq.ft · {form.facing} facing</span>
          </div>

          <div className="mt-6 py-5 border-b border-neutral-100">
            <label className="block text-xs text-neutral-400 mb-1.5">Why this property (generated — editable)</label>
            <textarea
              value={generated.pitch}
              onChange={(e) => setGenerated((g) => ({ ...g, pitch: e.target.value }))}
              rows={3}
              className="w-full text-sm text-neutral-700 leading-relaxed outline-none bg-neutral-50 rounded-xl p-3"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-900 mb-3">Nearby amenities (auto-detected)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {generated.amenities.map((a, i) => <AmenityCard key={i} a={a} />)}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-xs text-neutral-400 mb-1.5">Description (generated — editable)</label>
            <textarea
              value={generated.description}
              onChange={(e) => setGenerated((g) => ({ ...g, description: e.target.value }))}
              rows={4}
              className="w-full text-sm text-neutral-600 leading-relaxed outline-none bg-neutral-50 rounded-xl p-3"
            />
          </div>
        </div>

        <div>
          <div className="rounded-2xl bg-neutral-100 p-5 mb-4">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Submitted facts</h3>
            <dl className="space-y-2 text-sm">
              <Row label="Location" value={`${form.locality}, Bengaluru ${generated.zone}`} />
              <Row label="Type" value={`${form.type}${form.bhk && (form.type === "Villa" || form.type === "Flat") ? ` · ${form.bhk} BHK` : ""}`} />
              <Row label="Size" value={`${form.size} sq.ft`} />
              <Row label="Price" value={formatPrice(Number(form.price) || 0)} />
              <Row label="Facing" value={form.facing} />
              <Row label="Approval" value={form.approval} />
            </dl>
            <p className="text-xs text-neutral-400 mt-3">Cross-check these against the generated copy above before publishing.</p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Technical SEO (auto-generated)</h3>
            <dl className="space-y-3 text-xs">
              <div>
                <div className="text-neutral-400 mb-0.5">Meta description</div>
                <div className="text-neutral-700">{generated.meta}</div>
              </div>
              <div>
                <div className="text-neutral-400 mb-0.5">URL slug</div>
                <div className="text-neutral-700 break-all">/property/{generated.slug}</div>
              </div>
              <div>
                <div className="text-neutral-400 mb-0.5">Media</div>
                <div className="text-neutral-700">
                  {media.filter((m) => m.type === "image").length} photo{media.filter((m) => m.type === "image").length !== 1 ? "s" : ""} tagged
                  {media.some((m) => m.type === "video") && `, ${media.filter((m) => m.type === "video").length} video${media.filter((m) => m.type === "video").length !== 1 ? "s" : ""} attached`}
                </div>
              </div>
              <div>
                <div className="text-neutral-400 mb-0.5">Schema markup</div>
                <div className="text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> RealEstateListing JSON-LD ready</div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
