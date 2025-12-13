import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/lib/safeStorage";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or system preference (safely)
    const stored = safeLocalStorage.getItem("theme") as "light" | "dark" | null;
    let prefersDark = false;
    try {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      // matchMedia not available in some browsers
    }
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    safeLocalStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, mounted };
}
