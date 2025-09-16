"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem("theme");
    const isDark = pref ? pref === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-sm rounded-xl border px-3 py-1.5 border-neutral-300 hover:border-neutral-400 bg-white dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 dark:hover:border-neutral-600"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

