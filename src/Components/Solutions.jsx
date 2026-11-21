"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

// Each card reads its text from messages: Solutions.items.<key>.*
const solutions = [
  { key: "webApp", cover: "/assets/solutions/01.svg" },
  { key: "reactNext", cover: "/assets/solutions/02.svg" },
  { key: "payment", cover: "/assets/solutions/03.svg" },
  { key: "zatca", cover: "/assets/solutions/04.svg" },
  { key: "pentest", cover: "/assets/solutions/05.svg" },
  { key: "managedSecurity", cover: "/assets/solutions/06.svg" },
];

export default function Solutions() {
  const t = useTranslations("Solutions");
  const [index, setIndex] = useState(0);
  const total = solutions.length;

  // Mobile arrows loop around: after the last card it goes back to the first
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    // No background here: the purple gradient comes from the wrapper in page.js
    <section className="px-5 pt-16 pb-20 lg:px-10 lg:pt-[120px] lg:pb-24 xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Heading + description */}
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="heading-tracking font-heading text-[32px] leading-9 font-normal text-white md:text-5xl md:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-6 text-white/70 md:text-lg md:leading-[26px]">
            {t("description")}
          </p>
        </div>

        {/* Cards: grid on md+, one card at a time on mobile */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {solutions.map((item, i) => (
            <motion.article
              key={item.key}
              // Fade up when scrolled into view. Each row appears left to right.
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.1,
              }}
              className={`${i === index ? "flex" : "hidden"
                } solution-card group relative isolate flex-col overflow-hidden rounded-xl border border-white/10 bg-[#241A38] transition-[translate,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-brand-light/30 hover:shadow-[0_24px_60px_-24px_rgba(99,62,233,0.6)] focus-within:border-brand-light/30 md:flex`}
            >
              {/* Soft purple glow at the bottom, behind the button */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(99,62,233,0.5),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
              />

              {/* Cover */}
              <Image
                src={item.cover}
                alt=""
                width={0}
                height={0}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full"
              />

              <div className="flex flex-1 flex-col p-6">
                <p className=" text-base font-normal text-white/70 uppercase">
                  {t(`items.${item.key}.category`)}
                </p>

                <h3 className="mt-3 font-heading text-xl font-bold text-white">
                  {t(`items.${item.key}.title`)}
                </h3>

                <p className="mt-3 text-base font-normal text-white/70">
                  {t(`items.${item.key}.description`)}
                </p>

                <p className="mt-5 font-heading text-2xl font-medium text-white">
                  {t(`items.${item.key}.price`)}
                </p>

                <p className="mt-1.5 text-base font-normal text-white/70">
                  {t("priceNote")}
                </p>

                {/* mt-auto keeps all six buttons on the same line in the grid */}
                <div className="mt-auto pt-6">
                  {/* The ::after layer stretches the link over the whole card.
                      On phones the visible card's button is always filled,
                      because there is no hover on a touch screen. */}
                  <a
                    href="#contact"
                    aria-label={`${t("cta")}: ${t(`items.${item.key}.title`)}`}
                    className="flex h-12 w-full items-center justify-center rounded-full border border-white/10 bg-[#1A1230] px-5 text-base font-medium text-white transition-[background-color,border-color,box-shadow,scale] duration-300 after:absolute after:inset-0 group-hover:border-brand group-hover:bg-brand group-hover:shadow-[0_0_32px_rgba(99,62,233,0.5)] group-focus-within:border-brand group-focus-within:bg-brand active:scale-[0.97] max-md:border-brand max-md:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
                  >
                    {t("cta")}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile arrows. rtl:-scale-x-100 flips them for Arabic */}
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <button type="button" onClick={prev} aria-label={t("prev")}>
            <Image
              src="/assets/arrow-left.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
              className="rtl:-scale-x-100"
            />
          </button>
          <button type="button" onClick={next} aria-label={t("next")}>
            <Image
              src="/assets/arrow-right.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
              className="rtl:-scale-x-100"
            />
          </button>
        </div>
      </div>
    </section>
  );
}