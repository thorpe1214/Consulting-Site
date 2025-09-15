// components/SiteFooter.tsx
import { theme } from "@/config/theme";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center gap-3">
          <a className="underline" href={`mailto:${theme.contact.email}`}>{theme.contact.email}</a>
          {theme.contact.calendly && (
            <>
              <span>•</span>
              <a className="underline" href={theme.contact.calendly} target="_blank" rel="noreferrer">Book time</a>
            </>
          )}
        </div>
        <div className="mt-4">© {new Date().getFullYear()} {theme.siteName}. All rights reserved.</div>
      </div>
    </footer>
  );
}

