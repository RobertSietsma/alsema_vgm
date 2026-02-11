"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import StepProjectInfo from "@/components/steps/StepProjectInfo";
import StepProjectDetails from "@/components/steps/StepProjectDetails";
import StepTemplateSelection from "@/components/steps/StepTemplateSelection";
import StepReviewGenerate from "@/components/steps/StepReviewGenerate";
import FormButton from "@/components/ui/FormButton";
import { FormData, StepId } from "@/lib/types";
import { generateDocument } from "@/lib/docx-generator";

const initialFormData: FormData = {
  projectName: "",
  location: "",
  contractor: "",
  projectManager: "",
  client: "",
  projectDescription: "",
  typeOfWork: "",
  disciplines: [],
  subcontractorPresent: false,
  selectedTemplate: null,
};

function validateStep(step: StepId, formData: FormData): string | null {
  switch (step) {
    case 1:
      if (
        !formData.projectName.trim() ||
        !formData.location.trim() ||
        !formData.contractor.trim() ||
        !formData.projectManager.trim() ||
        !formData.client.trim()
      ) {
        return "Vul alle verplichte velden in.";
      }
      return null;
    case 2:
      if (
        !formData.projectDescription.trim() ||
        !formData.typeOfWork.trim() ||
        formData.disciplines.length === 0
      ) {
        return "Vul alle verplichte velden in.";
      }
      return null;
    case 3:
      if (!formData.selectedTemplate) {
        return "Selecteer een template.";
      }
      return null;
    default:
      return null;
  }
}

export default function FormWizard() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateFormData(updates: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...updates }));
    setError(null);
  }

  function goNext() {
    const validationError = validateStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 4) as StepId);
  }

  function goPrev() {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1) as StepId);
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    try {
      await generateDocument(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Er is een fout opgetreden bij het genereren."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <StepIndicator currentStep={currentStep} />

      <div className="mt-8 flex-1 overflow-y-auto pr-1">
        {currentStep === 1 && (
          <StepProjectInfo formData={formData} onChange={updateFormData} />
        )}
        {currentStep === 2 && (
          <StepProjectDetails formData={formData} onChange={updateFormData} />
        )}
        {currentStep === 3 && (
          <StepTemplateSelection formData={formData} onChange={updateFormData} />
        )}
        {currentStep === 4 && (
          <StepReviewGenerate
            formData={formData}
            isGenerating={isGenerating}
            error={error}
            onGenerate={handleGenerate}
          />
        )}
      </div>

      {error && currentStep !== 4 && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
          {error}
        </div>
      )}

      <div className="flex shrink-0 items-center justify-between border-t border-accent pt-6 mt-6">
        <div>
          {currentStep > 1 && (
            <FormButton variant="outline" onClick={goPrev}>
              Vorige
            </FormButton>
          )}
        </div>
        <div>
          {currentStep < 4 && (
            <FormButton onClick={goNext}>
              Volgende
            </FormButton>
          )}
        </div>
      </div>
    </div>
  );
}
