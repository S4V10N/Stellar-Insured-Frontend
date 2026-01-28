import React from "react";

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  soft?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "neutral",
  soft = true,
  ...props
}) => {
  const base =
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide";

  const variants: Record<BadgeVariant, string> = {
    primary: soft
      ? "bg-brand-primary/15 text-brand-primary"
      : "bg-brand-primary text-brand-bg",
    success: soft
      ? "bg-emerald-500/15 text-emerald-400"
      : "bg-emerald-500 text-slate-950",
    warning: soft
      ? "bg-amber-500/15 text-amber-400"
      : "bg-amber-500 text-slate-950",
    danger: soft
      ? "bg-rose-500/15 text-rose-400"
      : "bg-rose-500 text-slate-50",
    neutral: soft
      ? "bg-slate-700/40 text-slate-200"
      : "bg-slate-300 text-slate-900",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

