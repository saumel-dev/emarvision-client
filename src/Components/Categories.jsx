"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { categories, products } from "@/data/products";

// How many cards show at first, and how many each "Load More" adds
const PAGE_SIZE = 6;

// The same cover image is used on every card for now
const COVER_SRC = "/assets/product-cover.svg";

const slugs = categories.map((c) => c.slug);
// slug -> id used in the Services messages (e.g. "apps" -> "01"), for the category names
const keyBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.key]));

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
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
  );
}

function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function CategoriesSection() {
  const t = useTranslations("Categories");
  const tp = useTranslations("Products");
  const ts = useTranslations("Services");
  const locale = useLocale();

  // A link like /?category=fintech#categories (from the Services section)
  // selects that category when it arrives here
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [category, setCategory] = useState(
    slugs.includes(urlCategory) ? urlCategory : slugs[0]
  );
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    if (urlCategory && slugs.includes(urlCategory)) {
      setCategory(urlCategory);
      setQuery("");
      setVisible(PAGE_SIZE);
    }
  }, [urlCategory]);

  // Numbers always use 0-9 digits with the language's own comma style
  const numberFormat = useMemo(
    () => new Intl.NumberFormat(`${locale}-u-nu-latn`),
    [locale]
  );

  const searching = query.trim() !== "";

  // While searching, all products are searched. Otherwise only the chosen category.
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return products.filter((p) =>
        `${tp(`items.${p.id}.title`)} ${tp(`items.${p.id}.description`)}`
          .toLowerCase()
          .includes(q)
      );
    }
    return products.filter((p) => p.category === category);
  }, [query, category, tp]);

  const shown = list.slice(0, visible);
  const hasMore = list.length > visible;

  const selectCategory = (slug) => {
    setCategory(slug);
    setQuery("");
    setVisible(PAGE_SIZE);
    // Keep the address bar in sync so the link can be shared
    const url = new URL(window.location.href);
    url.searchParams.set("category", slug);
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  };

  const onSearch = (value) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  // Tells the contact form which product the visitor asked about.
  // The page still scrolls to #contact through the link itself.
  const askAbout = (p) => {
    window.dispatchEvent(
      new CustomEvent("product-inquiry", {
        detail: { id: p.id, title: tp(`items.${p.id}.title`) },
      })
    );
  };

  return (
    <section
      id="categories"
      className="bg-[#090710] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20"
    >
      <div className="mx-auto max-w-[1284px]">
        {/* Heading + search */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="heading-tracking max-w-[520px] font-heading text-[32px] leading-9 font-normal text-white lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>

          <div className="relative w-full lg:w-[360px]">
            <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-white/60">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchLabel")}
              className="h-12 w-full rounded-full border border-white/10 bg-[#1D1929] ps-11 pe-11 text-sm text-white transition-colors placeholder:text-white/50 hover:border-white/20 focus:border-brand-light/50 focus:outline-none"
            />
            {searching && (
              <button
                type="button"
                onClick={() => onSearch("")}
                aria-label={t("clearSearch")}
                className="absolute inset-y-0 end-3 my-auto flex size-7 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[280px_1fr]">
          {/* Categories: a scrolling row on small screens, a list on the left on large ones */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ul
              aria-label={t("categoriesLabel")}
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((c) => {
                const active = !searching && category === c.slug;
                return (
                  <li key={c.slug} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => selectCategory(c.slug)}
                      aria-pressed={active}
                      className={`inline-flex h-11 w-full cursor-pointer items-center rounded-full px-5 text-start text-sm whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light ${
                        active
                          ? "bg-brand text-white"
                          : "bg-[#1D1929] text-white/70 hover:bg-[#241A38] hover:text-white"
                      }`}
                    >
                      {ts(`items.${c.key}.title`)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Products */}
          <div>
            {list.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#241A38] px-6 py-16 text-center">
                <p className="font-heading text-xl text-white">
                  {t("noResults")}
                </p>
                <p className="mt-2 text-base text-white/70">
                  {t("noResultsHint")}
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((p, i) => {
                  const title = tp(`items.${p.id}.title`);
                  return (
                    <motion.li
                      key={p.id}
                      // Fade up when the card appears. New cards from "Load More" start
                      // from their own position, so they appear one after another.
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: (i % PAGE_SIZE) * 0.05,
                      }}
                      className="product-card group relative isolate flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#241A38] transition-[translate,border-color,box-shadow] duration-300 ease-out focus-within:border-brand-light/30 hover:-translate-y-1 hover:border-brand-light/30 hover:shadow-[0_24px_60px_-24px_rgba(99,62,233,0.6)]"
                    >
                      {/* Soft purple glow at the bottom, behind the button */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(99,62,233,0.45),transparent)] opacity-70 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
                      />

                      {/* Cover with the icon box and the card number on top */}
                      <div className="relative">
                        <Image
                          src={COVER_SRC}
                          alt=""
                          width={0}
                          height={0}
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
                          className="h-auto w-full"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute start-4 top-4 flex size-9 items-center justify-center rounded-lg bg-brand text-white"
                        >
                          <GlobeIcon />
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute end-4 top-4 rounded-md bg-black/30 px-2 py-1 text-xs text-white/80 backdrop-blur-sm"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-sm text-white/70">
                          {ts(`items.${keyBySlug[p.category]}.title`)}
                        </p>

                        <h3 className="mt-3 font-heading text-lg leading-6 font-medium text-white">
                          {title}
                        </h3>

                        <p className="mt-2 text-sm leading-5 text-white/70">
                          {tp(`items.${p.id}.description`)}
                        </p>

                        <p className="mt-5 flex items-baseline gap-2 font-heading text-2xl text-white">
                          <span>
                            {t("price", { amount: numberFormat.format(p.price) })}
                          </span>
                          {p.oldPrice && (
                            <span className="text-base text-white/40 line-through">
                              {numberFormat.format(p.oldPrice)}
                            </span>
                          )}
                        </p>

                        <p className="mt-1.5 text-sm text-white/60">
                          {t("priceNote")}
                        </p>

                        {/* mt-auto keeps the buttons on the same line across a row.
                            The ::after layer stretches the link over the whole card. */}
                        <div className="mt-auto pt-6">
                          <a
                            href="#contact"
                            onClick={() => askAbout(p)}
                            aria-label={`${t("requestDetails")}: ${title}`}
                            className="flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-[#1A1230] px-5 text-base font-medium text-white transition-[background-color,border-color,box-shadow,scale] duration-300 group-focus-within:border-brand group-focus-within:bg-brand group-hover:border-brand group-hover:bg-brand group-hover:shadow-[0_0_32px_rgba(99,62,233,0.5)] active:scale-[0.97] active:bg-brand after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
                          >
                            {t("requestDetails")}
                          </a>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            )}

            {/* Count + Load more */}
            {list.length > 0 && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <p className="text-sm text-white/60" aria-live="polite">
                  {t("showing", { shown: shown.length, total: list.length })}
                </p>
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="h-12 cursor-pointer rounded-full border border-white/10 bg-[#1D1929] px-7 text-base text-white transition-[background-color,border-color,box-shadow,scale] duration-300 hover:border-brand hover:bg-brand hover:shadow-[0_0_32px_rgba(99,62,233,0.5)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
                  >
                    {t("loadMore")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// useSearchParams needs a Suspense wrapper in the App Router.
// The fallback keeps the section's id so the navbar link still works.
export default function Categories() {
  return (
    <Suspense
      fallback={<section id="categories" className="min-h-[600px] bg-[#090710]" />}
    >
      <CategoriesSection />
    </Suspense>
  );
}