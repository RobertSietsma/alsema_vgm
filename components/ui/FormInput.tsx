"use client";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-accent bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-foreground focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
