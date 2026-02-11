"use client";

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
}

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed shadow-sm",
  secondary:
    "bg-accent text-foreground hover:bg-accent/80",
  outline:
    "border border-accent bg-white text-foreground hover:bg-accent/40",
};

export default function FormButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}: FormButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
