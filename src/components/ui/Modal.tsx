"use client";

import React, { useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  showCloseButton = true,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      aria-modal="true"
      role="dialog"
    >
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${sizes[size]} animate-[slideUp_0.35s_ease-out]`}
      >
        <div className="rounded-3xl bg-brand-card/95 border border-brand-border/70 shadow-2xl shadow-black/60">
          <div className="flex items-start justify-between gap-4 border-b border-slate-800/60 px-6 py-4">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-white">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-brand-text-muted">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <Button
                aria-label="Close modal"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="rounded-full border-slate-700 bg-slate-900/60 px-3 py-1 text-xs"
              >
                ✕
              </Button>
            )}
          </div>

          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

