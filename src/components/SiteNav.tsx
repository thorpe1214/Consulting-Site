// components/SiteNav.tsx
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" aria-label="Home"><Logo /></a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#results" className="hover:underline">Results</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
