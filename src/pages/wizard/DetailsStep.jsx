import { MapPin, ImagePlus, X, Sparkles, Play } from "lucide-react";
import Field from "../../components/Field";
import PillButton from "../../components/PillButton";
import { inputCls } from "../../lib/inputCls";
import { sortMedia } from "../../lib/utils";

export default function DetailsStep({ form, setForm, media, setMedia, onGenerate, error }) {
  function update(key, value) { setForm((f) => ({ ...f, [key]: value })); }
  function handleMediaUpload(e) {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (file.type.startsWith("video/")) {
        const src = URL.createObjectURL(file);
        setMedia((prev) => sortMedia([...prev, { type: "video", src, name: file.name }]));
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setMedia((prev) => sortMedia([...prev, { type: "image", src: ev.target.result, name: file.name }]));
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  }
  function removeMedia(i) { setMedia((m) => m.filter((_, idx) => idx !== i)); }
  const showBhk = form.type === "Villa" || form.type === "Flat";

  return (
    <div className="max-w-2xl">
      <Field label="Property location">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-50">
          <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
          <input value={form.locality} onChange={(e) => update("locality", e.target.value)} placeholder="e.g. Whitefield, Bengaluru" className="bg-transparent outline-none text-sm w-full" />
        </div>
        <div className="h-32 rounded-xl bg-neutral-100 mt-2 flex items-center justify-center text-neutral-400">
          <MapPin className="w-6 h-6" />
        </div>
      </Field>

      <div className="mt-6">
        <Field label="Photos & videos">
          <label className="cursor-pointer rounded-2xl border-2 border-dashed border-neutral-200 hover:border-neutral-400 transition-colors flex flex-col items-center justify-center gap-2 py-10 text-center block">
            <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleMediaUpload} />
            <ImagePlus className="w-6 h-6 text-neutral-400" />
            <div className="text-sm text-neutral-500">Click to upload photos or a walkthrough video</div>
            <div className="text-xs text-neutral-400">Photos lead the listing; videos show with a play icon</div>
          </label>
          {media.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {media.map((m, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  {m.type === "video" ? (
                    <>
                      <video src={m.src} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-neutral-900" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={m.src} className="w-full h-full object-cover" alt="" />
                  )}
                  <button onClick={() => removeMedia(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <X className="w-3 h-3 text-neutral-700" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Property type">
          <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputCls}>
            {["Plot", "Villa", "Flat", "Commercial"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {showBhk && (
          <Field label="Configuration">
            <select value={form.bhk} onChange={(e) => update("bhk", e.target.value)} className={inputCls}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} BHK</option>)}
            </select>
          </Field>
        )}
        <Field label="Facing">
          <select value={form.facing} onChange={(e) => update("facing", e.target.value)} className={inputCls}>
            {["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"].map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Field label="Size (sq.ft)">
          <input type="number" value={form.size} onChange={(e) => update("size", e.target.value)} placeholder="1200" className={inputCls} />
        </Field>
        <Field label="Price (₹)">
          <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="8500000" className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Field label="Approval / authority">
          <select value={form.approval} onChange={(e) => update("approval", e.target.value)} className={inputCls}>
            {["BDA Approved", "BDA Allotted", "BMRDA Approved", "BBMP Khata", "BBMP A Khata"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Project / layout (optional)">
          <input value={form.project} onChange={(e) => update("project", e.target.value)} placeholder="e.g. Prestige Whistling Palms" className={inputCls} />
        </Field>
      </div>

      {error && <p className="text-sm text-rose-600 mt-4">{error}</p>}

      <PillButton onClick={onGenerate} variant="accent" className="mt-8">
        <Sparkles className="w-4 h-4" /> Generate listing
      </PillButton>
    </div>
  );
}
