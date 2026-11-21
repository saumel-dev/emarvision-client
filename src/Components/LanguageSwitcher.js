"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// "font" makes each name use its own script font, even when the page is in another language
const languages = [
  { code: "en", native: "English", short: "EN" },
  { code: "ar", native: "العربية", short: "AR", font: "var(--font-arabic)" },
  { code: "bn", native: "বাংলা", short: "BN", font: "var(--font-bengali)" },
  { code: "hi", native: "हिन्दी", short: "HI", font: "var(--font-devanagari)" },
  { code: "id", native: "Indonesia", short: "ID" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code) => {
    setOpen(false);
    if (code !== locale) {
      router.replace(pathname, { locale: code, scroll: false });
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("language")}
        className={`inline-flex h-[34px] items-center gap-2 rounded-[48px] border px-3.5  text-sm uppercase transition-colors ${
          open
            ? "border-brand/60 text-brand-light"
            : "border-white/15 text-white hover:border-brand/60 hover:text-brand-light"
        }`}
      >
        {/* Globe */}
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>

        <span>{current.short}</span>

        {/* Small arrow */}
        <svg
          viewBox="0 0 24 24"
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute end-0 top-full z-50 mt-3 w-48 rounded-2xl border border-brand/30 bg-[#16102B] p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]">
          {languages.map((l) => {
            const isActive = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  lang={l.code}
                  onClick={() => choose(l.code)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                    isActive
                      ? "bg-brand/20 text-brand-light"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    style={
                      l.font ? { fontFamily: `${l.font}, sans-serif` } : undefined
                    }
                  >
                    {l.native}
                  </span>
                  <span
                    className={` text-xs uppercase ${
                      isActive ? "text-brand-light" : "text-white/40"
                    }`}
                  >
                    {l.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}