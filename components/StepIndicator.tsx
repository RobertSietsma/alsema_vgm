"use client";

import { STEPS } from "@/lib/templates";
import { StepId } from "@/lib/types";

interface StepIndicatorProps {
  currentStep: StepId;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center">
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-foreground text-white"
                      : "bg-accent text-muted"
                }`}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isCurrent
                    ? "text-foreground"
                    : isCompleted
                      ? "text-primary"
                      : "text-muted"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-4 mb-6 h-px flex-1 transition-colors ${
                  isCompleted ? "bg-primary" : "bg-accent"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
