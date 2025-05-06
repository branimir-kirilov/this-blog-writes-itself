"use client";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import * as React from "react";

export const ThemeButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <span className={cn("gap-2.5", className)}>
      {theme === "dark" ? (
        <Sun width={20} height={20} className="text-primary mr-2" />
      ) : (
        <Moon width={20} height={20} className="text-primary mr-2" />
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(className)}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </Button>
    </span>
  );
};
