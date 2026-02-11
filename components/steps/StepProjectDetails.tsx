"use client";

import FormTextarea from "@/components/ui/FormTextarea";
import FormInput from "@/components/ui/FormInput";
import RadioGroup from "@/components/ui/RadioGroup";
import { FormData } from "@/lib/types";
import { DISCIPLINES } from "@/lib/templates";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface StepProjectDetailsProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export default function StepProjectDetails({
  formData,
  onChange,
}: StepProjectDetailsProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-accent pb-4">
        <h2 className="text-base font-semibold text-foreground">Projectdetails</h2>
        <p className="mt-0.5 text-sm text-muted">
          Beschrijf de aard en details van het project.
        </p>
      </div>
      <FormTextarea
        label="Projectomschrijving"
        value={formData.projectDescription}
        onChange={(v) => onChange({ projectDescription: v })}
        placeholder="Geef een korte omschrijving van het project..."
        required
      />
      <FormInput
        label="Type werkzaamheden"
        value={formData.typeOfWork}
        onChange={(v) => onChange({ typeOfWork: v })}
        placeholder="Bijv. Elektrotechnische installatie"
        required
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Discipline<span className="ml-0.5 text-primary">*</span>
        </label>
        <Combobox
          items={DISCIPLINES}
          multiple
          value={formData.disciplines}
          onValueChange={(v) => onChange({ disciplines: v })}
        >
          <ComboboxChips className="rounded-lg border-accent bg-white text-sm">
            {formData.disciplines.map((item) => (
              <ComboboxChip key={item}>{item}</ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Selecteer disciplines..." />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>Geen disciplines gevonden.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <RadioGroup
        label="Onderaannemer aanwezig?"
        value={formData.subcontractorPresent}
        onChange={(v) => onChange({ subcontractorPresent: v })}
      />
    </div>
  );
}
