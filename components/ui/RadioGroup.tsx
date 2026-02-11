"use client";

interface RadioGroupProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function RadioGroup({ label, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all ${
            value
              ? "border-primary bg-primary text-white"
              : "border-accent bg-white text-foreground hover:border-foreground/20"
          }`}
        >
          Ja
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all ${
            !value
              ? "border-primary bg-primary text-white"
              : "border-accent bg-white text-foreground hover:border-foreground/20"
          }`}
        >
          Nee
        </button>
      </div>
    </div>
  );
}
