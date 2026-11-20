"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

// Each link jumps to the section that has this id, e.g. <section id="solutions">
const links = [
  { id: "solutions", key: "solutions" },
  { id: "categories", key: "categories" },
  { id: "how-it-works", key: "howItWorks" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" }
];

// The little dotted arrow. It mirrors itself in right-to-left languages.
function DotIcon() {
  return (
    <Image
      src="/assets/dot-btn.svg"
      alt=""
      width={20}
      height={20}
      aria-hidden="true"
      className="rtl:-scale-x-100"
    />
  );
}

// Shared look of the "Request consultation" button (size and display are added where it is used)
const ctaBase =
  "items-center justify-center gap-3 rounded-[48px] border border-brand/20 bg-linear-to-b from-brand/10 to-brand/25 px-7 font-mono text-sm uppercase leading-[26px] text-white transition hover:from-brand/20 hover:to-brand/35";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // 1. Solid background once the page is scrolled, and no active link at the very top
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 120) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Highlight the link of the section that is currently on screen
  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // 3. Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const itemClass = (id) =>
    ` text-sm uppercase leading-[26px] transition-colors hover:text-brand ${
      active === id ? "text-brand" : "text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-white/5 bg-[#100B22]/50 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      {/* Full width: logo at the far left, buttons at the far right, links in the exact center */}
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center px-5 py-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-[30px] xl:px-20">
        {/* Logo */}
        <Link
          href="/"
          className="justify-self-start"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/logo.svg"
            alt="Emarvision"
            width={138}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        {/* Links (desktop only) */}
        <nav className="hidden items-center lg:flex">
          <ul className="flex items-center">
            {links.map((item, i) => (
              <Fragment key={item.id}>
                {i > 0 && (
                  <li aria-hidden="true" className="h-3 w-px bg-white/25" />
                )}
                <li>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`block px-5 ${itemClass(item.id)}`}
                  >
                    {t(item.key)}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        {/* Right side: language dropdown, Request button (desktop), burger (mobile) */}
        <div className="flex items-center gap-3 justify-self-end">
          <LanguageSwitcher />

          <a
            href="#contact"
            className={`hidden h-[34px] lg:inline-flex ${ctaBase}`}
          >
            {t("requestConsultation")}
            <DotIcon />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:text-brand lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu: everything goes in here except the language dropdown */}
      {menuOpen && (
        <div className="max-h-[calc(100svh-5.5rem)] overflow-y-auto border-t border-white/10 lg:hidden">
          <div className="px-5 pt-2 pb-8">
            <ul>
              {links.map((item) => (
                <li key={item.id} className="border-b border-white/10">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 ${itemClass(item.id)}`}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={`mt-6 flex h-12 w-full ${ctaBase}`}
            >
              {t("requestConsultation")}
              <DotIcon />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}