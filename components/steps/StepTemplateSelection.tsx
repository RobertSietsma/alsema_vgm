"use client";

import { useRef } from "react";
import { FormData, TemplateOption } from "@/lib/types";
import { BUILTIN_TEMPLATES } from "@/lib/templates";

interface StepTemplateSelectionProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export default function StepTemplateSelection({
  formData,
  onChange,
}: StepTemplateSelectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedTemplate: TemplateOption = {
      id: `uploaded-${Date.now()}`,
      name: file.name.replace(/\.docx$/, ""),
      description: "Geupload template bestand",
      file,
      source: "uploaded",
    };
    onChange({ selectedTemplate: uploadedTemplate });
  }

  function selectTemplate(template: TemplateOption) {
    onChange({ selectedTemplate: template });
  }

  const isSelected = (id: string) => formData.selectedTemplate?.id === id;

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-accent pb-4">
        <h2 className="text-base font-semibold text-foreground">Template Selectie</h2>
        <p className="mt-0.5 text-sm text-muted">
          Kies een ingebouwd template of upload uw eigen Word-bestand.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {BUILTIN_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => selectTemplate(template)}
            className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
              isSelected(template.id)
                ? "border-primary bg-primary/5"
                : "border-accent bg-white hover:border-foreground/20"
            }`}
          >
            {isSelected(template.id) && (
              <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <span className="font-medium text-foreground">{template.name}</span>
              <span className="text-xs text-muted leading-relaxed">
                {template.description}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-accent" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-muted">of</span>
        </div>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          formData.selectedTemplate?.source === "uploaded"
            ? "border-primary bg-primary/5"
            : "border-accent hover:border-foreground/20"
        }`}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
          <svg
            className="h-6 w-6 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">
          {formData.selectedTemplate?.source === "uploaded"
            ? formData.selectedTemplate.name + ".docx"
            : "Upload een eigen template"}
        </p>
        <p className="mt-1 text-xs text-muted">
          Klik om een .docx bestand te selecteren
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="rounded-xl bg-secondary p-5">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <span className="text-sm font-medium text-foreground">Beschikbare placeholders</span>
        </div>
        <p className="mt-1 text-xs text-muted">
          Deze tags worden automatisch vervangen door de ingevulde formuliergegevens.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { tag: "{{ProjectName}}", desc: "Projectnaam" },
            { tag: "{{Location}}", desc: "Locatie" },
            { tag: "{{Contractor}}", desc: "Aannemer" },
            { tag: "{{ProjectManager}}", desc: "Projectleider" },
            { tag: "{{Client}}", desc: "Opdrachtgever" },
            { tag: "{{ProjectDescription}}", desc: "Projectomschrijving" },
            { tag: "{{TypeOfWork}}", desc: "Type werkzaamheden" },
            { tag: "{{Discipline}}", desc: "Discipline(s)" },
            { tag: "{{SubcontractorPresent}}", desc: "Onderaannemer aanwezig (Ja/Nee)" },
          ].map(({ tag, desc }) => (
            <div key={tag} className="flex items-center gap-2">
              <code className="font-mono text-xs bg-white rounded px-1.5 py-0.5 text-foreground">{tag}</code>
              <span className="text-xs text-muted">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
