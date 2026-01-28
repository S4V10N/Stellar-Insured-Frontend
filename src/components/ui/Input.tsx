import React, { forwardRef } from "react";

type InputState = "default" | "success" | "error";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  state?: InputState;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, state = "default", className = "", ...props },
    ref,
  ) => {
    const hasError = state === "error" || !!error;
    const isSuccess = state === "success" && !hasError;

    const borderState = hasError
      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
      : isSuccess
        ? "border-emerald-500/80 focus:border-emerald-500 focus:ring-emerald-500"
        : "border-slate-800 hover:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500";

    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`w-full rounded-lg bg-slate-900/50 border-2 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${borderState} ${className}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError || helperText ? `${props.id}-description` : undefined
            }
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p
            id={`${props.id}-description`}
            className={`mt-1 text-sm ${
              hasError ? "text-rose-400" : "text-slate-400"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
