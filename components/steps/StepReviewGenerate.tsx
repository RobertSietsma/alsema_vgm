"use client";

import FormButton from "@/components/ui/FormButton";
import { FormData } from "@/lib/types";

interface StepReviewGenerateProps {
  formData: FormData;
  isGenerating: boolean;
  error: string | null;
  onGenerate: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-2">
      <span className="text-sm text-muted sm:w-44 sm:shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value || "-"}</span>
    </div>
  );
}

export default function StepReviewGenerate({
  formData,
  isGenerating,
  error,
  onGenerate,
}: StepReviewGenerateProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-accent pb-4">
        <h2 className="text-base font-semibold text-foreground">Overzicht & Genereren</h2>
        <p className="mt-0.5 text-sm text-muted">
          Controleer de ingevulde gegevens en genereer het document.
        </p>
      </div>

      <div className="rounded-xl border border-accent p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Projectinformatie
        </h3>
        <div className="flex flex-col divide-y divide-accent/60">
          <Row label="Projectnaam" value={formData.projectName} />
          <Row label="Locatie" value={formData.location} />
          <Row label="Aannemer" value={formData.contractor} />
          <Row label="Projectleider" value={formData.projectManager} />
          <Row label="Opdrachtgever" value={formData.client} />
        </div>
      </div>

      <div className="rounded-xl border border-accent p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Projectdetails
        </h3>
        <div className="flex flex-col divide-y divide-accent/60">
          <Row label="Projectomschrijving" value={formData.projectDescription} />
          <Row label="Type werkzaamheden" value={formData.typeOfWork} />
          <Row label="Discipline" value={formData.disciplines.join(", ")} />
          <Row
            label="Onderaannemer"
            value={formData.subcontractorPresent ? "Ja" : "Nee"}
          />
        </div>
      </div>

      <div className="rounded-xl border border-accent p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Template
        </h3>
        <Row
          label="Geselecteerd"
          value={
            formData.selectedTemplate
              ? `${formData.selectedTemplate.name} (${formData.selectedTemplate.source === "builtin" ? "Ingebouwd" : "Geupload"})`
              : "Geen template geselecteerd"
          }
        />
      </div>

      {error && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
          {error}
        </div>
      )}

      <FormButton onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? "Bezig met genereren..." : "Document Genereren"}
      </FormButton>
    </div>
  );
}
