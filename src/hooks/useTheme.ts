"use client";

import { useTheme as useThemeContext } from "@/components/ThemeProvider";

export type { Theme } from "@/components/ThemeProvider";

/**
 * Custom hook for theme management
 * Use within a ThemeProvider context
 *
 * @returns theme - Current theme setting ('light', 'dark', or 'system')
 * @returns resolvedTheme - The actual applied theme ('light' or 'dark')
 * @returns setTheme - Function to set theme preference
 * @returns toggleTheme - Function to toggle between light and dark
 */
export function useTheme() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeContext();

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  } as const;
}
