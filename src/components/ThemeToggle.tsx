import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    const themes = ["light", "dark", "pink", "purple"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.className = nextTheme === "light" ? "" : `theme-${nextTheme}`;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={handleThemeChange}
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Palette className="h-5 w-5" />
      )}
    </Button>
  );
};