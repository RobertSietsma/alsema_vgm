"use client";

import FormInput from "@/components/ui/FormInput";
import { FormData } from "@/lib/types";

interface StepProjectInfoProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export default function StepProjectInfo({ formData, onChange }: StepProjectInfoProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-accent pb-4">
        <h2 className="text-base font-semibold text-foreground">Projectinformatie</h2>
        <p className="mt-0.5 text-sm text-muted">
          Vul de basisgegevens van het project in.
        </p>
      </div>
      <FormInput
        label="Projectnaam"
        value={formData.projectName}
        onChange={(v) => onChange({ projectName: v })}
        placeholder="Bijv. Renovatie Kantoorpand"
        required
      />
      <FormInput
        label="Locatie"
        value={formData.location}
        onChange={(v) => onChange({ location: v })}
        placeholder="Bijv. Amsterdam"
        required
      />
      <FormInput
        label="Aannemer"
        value={formData.contractor}
        onChange={(v) => onChange({ contractor: v })}
        placeholder="Bijv. Alsema B.V."
        required
      />
      <FormInput
        label="Projectleider"
        value={formData.projectManager}
        onChange={(v) => onChange({ projectManager: v })}
        placeholder="Bijv. Jan de Vries"
        required
      />
      <FormInput
        label="Opdrachtgever"
        value={formData.client}
        onChange={(v) => onChange({ client: v })}
        placeholder="Bijv. Gemeente Amsterdam"
        required
      />
    </div>
  );
}
