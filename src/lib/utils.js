import { LOCALITY_DB } from "./constants";

export function formatPrice(v) {
  if (v >= 10000000) { const cr = v / 10000000; return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`; }
  if (v >= 100000) { const l = v / 100000; return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`; }
  return `₹${v.toLocaleString("en-IN")}`;
}

export function detectLocalityData(input) {
  const key = input.toLowerCase();
  const found = Object.keys(LOCALITY_DB).find((k) => k !== "default" && key.includes(k));
  return LOCALITY_DB[found] || LOCALITY_DB.default;
}
export function buildTitle(form, loc) {
  const typeLabel = form.type === "Plot" ? "plot" : (form.type === "Villa" || form.type === "Flat") ? `${form.bhk} BHK ${form.type.toLowerCase()}` : "commercial space";
  return `${form.size} sq.ft, ${typeLabel} for sale in ${form.locality}, Bengaluru ${loc.zone}`;
}
export function buildPitch(form, loc) {
  return `${form.locality}'s location ${loc.landmark} keeps this ${form.type.toLowerCase()} well connected to daily needs and the wider Bengaluru ${loc.zone} corridor. With ${form.approval} in place, it's a straightforward, well-documented option for a buyer looking in ${form.locality}.`;
}
export function buildDescription(form, loc) {
  return `${form.size} sq.ft ${form.type.toLowerCase()} for sale in ${form.locality}, Bengaluru ${loc.zone}. ${form.facing}-facing, ${form.approval}${form.project ? `, part of ${form.project}` : ""}. Clear title, ready for registration.`;
}
export function buildMeta(form) {
  return `${form.size} sq.ft ${form.type} for sale in ${form.locality}, Bengaluru. ${form.approval}. Verified listing with direct WhatsApp contact.`;
}
export function buildSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
export function sortMedia(list) {
  const images = list.filter((m) => m.type === "image");
  const videos = list.filter((m) => m.type === "video");
  return [...images, ...videos];
}
export function buildAltTags(media, form) {
  const labels = ["Front view", "Street-facing angle", "Interior view", "Boundary view", "Access road view"];
  let imgIndex = 0;
  return media.map((m) => {
    if (m.type !== "image") return "Property walkthrough video";
    const tag = `${labels[imgIndex % labels.length]} of ${form.type.toLowerCase()} in ${form.locality}, Bengaluru`;
    imgIndex += 1;
    return tag;
  });
}
