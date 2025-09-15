// components/SiteNav.tsx
import { theme } from "@/config/theme";

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-neutral-50/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold">{theme.siteName}</a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}

