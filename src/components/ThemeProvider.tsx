"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "theme-preference";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme): "light" | "dark" {
  const root = document.documentElement;
  let resolvedTheme: "light" | "dark";

  if (theme === "system") {
    resolvedTheme = getSystemTheme();
  } else {
    resolvedTheme = theme;
  }

  if (resolvedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  return resolvedTheme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Get stored preference or use system
    let storedTheme: Theme | null = null;
    try {
      storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    } catch (e) {
      // ignore storage errors
    }

    const initialTheme = storedTheme || "system";
    setThemeState(initialTheme);
    const resolved = applyTheme(initialTheme);
    setResolvedTheme(resolved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem(THEME_KEY) || "system";
      if (currentTheme === "system") {
        const newResolved = applyTheme("system");
        setResolvedTheme(newResolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);

    // Persist to localStorage
    try {
      if (newTheme === "system") {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, newTheme);
      }
    } catch (e) {
      // ignore storage errors
    }

    const resolved = applyTheme(newTheme);
    setResolvedTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Provide context even before mounting to avoid hydration errors
  const value: ThemeContextType = mounted
    ? { theme, resolvedTheme, setTheme, toggleTheme }
    : { theme: "system", resolvedTheme: "light", setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
