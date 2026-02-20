"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        aria-label="Toggle color theme"
        title="Toggle color theme"
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
      >
        <span className="w-5 h-5 block" aria-hidden />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full 
        hover:bg-gray-200 dark:hover:bg-zinc-700 
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
        transition-colors duration-200"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      )}
    </button>
  );
}
