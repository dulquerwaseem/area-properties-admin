import { useState } from "react";
import DetailsStep from "./wizard/DetailsStep";
import GeneratingStep from "./wizard/GeneratingStep";
import ReviewStep from "./wizard/ReviewStep";
import { SAMPLE_MEDIA } from "../lib/sampleMedia";
import { detectLocalityData, buildTitle, buildPitch, buildDescription, buildMeta, buildSlug, buildAltTags } from "../lib/utils";

export default function WizardPage({ onPublish, onCancel }) {
  const [step, setStep] = useState("details");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ locality: "", type: "Plot", bhk: "2", facing: "East", size: "", price: "", approval: "BDA Approved", project: "" });
  const [media, setMedia] = useState(SAMPLE_MEDIA);
  const [generated, setGenerated] = useState(null);

  function handleGenerate() {
    if (!form.locality.trim() || !form.size || !form.price) {
      setError("Add the location, size and price before generating.");
      return;
    }
    setError("");
    setStep("generating");
  }

  function handleGenerationDone() {
    const loc = detectLocalityData(form.locality);
    const title = buildTitle(form, loc);
    setGenerated({
      title,
      pitch: buildPitch(form, loc),
      description: buildDescription(form, loc),
      meta: buildMeta(form),
      slug: buildSlug(title),
      zone: loc.zone,
      amenities: loc.amenities,
      altTags: buildAltTags(media, form),
    });
    setStep("review");
  }

  function handlePublish(status) {
    onPublish({
      id: Date.now(),
      title: generated.title,
      locality: form.locality,
      zone: generated.zone,
      price: Number(form.price) || 0,
      type: form.type,
      status,
      views: 0,
      date: "Just now",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Add property</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {step === "details" && "Step 1 of 3 — property details"}
            {step === "generating" && "Step 2 of 3 — generating"}
            {step === "review" && "Step 3 of 3 — review & publish"}
          </p>
        </div>
        <button onClick={onCancel} className="text-sm text-neutral-500 hover:text-neutral-900">Cancel</button>
      </div>

      {step === "details" && (
        <DetailsStep form={form} setForm={setForm} media={media} setMedia={setMedia} onGenerate={handleGenerate} error={error} />
      )}
      {step === "generating" && <GeneratingStep onDone={handleGenerationDone} />}
      {step === "review" && generated && (
        <ReviewStep form={form} media={media} generated={generated} setGenerated={setGenerated} onPublish={handlePublish} onBack={() => setStep("details")} />
      )}
    </div>
  );
}
