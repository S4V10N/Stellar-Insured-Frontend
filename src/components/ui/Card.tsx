import React from "react";

type CardVariant = "default" | "elevated" | "outline";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  interactive = false,
  ...props
}) => {
  const base =
    "rounded-2xl bg-bg-card border border-border/60 text-text-primary shadow-lg dark:shadow-black/40";

  const variants: Record<CardVariant, string> = {
    default: "",
    elevated:
      "border-border/80 shadow-xl shadow-cyan-500/10 bg-slate-900/80 dark:bg-slate-900/80",
    outline:
      "bg-transparent border-dashed border-border/70 shadow-none backdrop-blur-sm",
  };

  const interactiveClasses = interactive
    ? "transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    : "";

  return (
    <div
      className={`${base} ${variants[variant]} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
