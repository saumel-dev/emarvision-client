"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

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
    <section className="bg-brand py-16 md:py-24">
      <div className="mx-auto max-w-[1284px] px-4 md:px-6">
        {/* Heading + description */}
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="font-heading text-[32px] font-normal leading-9 text-white md:text-5xl md:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-sans text-base font-normal leading-6 text-white/70 md:text-lg md:leading-[26px]">
            {t("description")}
          </p>
        </div>

        {/* Cards: grid on md+, one card at a time on mobile */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {solutions.map((item, i) => (
            <article
              key={item.key}
              className={`${
                i === index ? "flex" : "hidden"
              } flex-col overflow-hidden rounded-xl bg-white md:flex`}
            >
              {/* Cover (the SVG already includes its own grid background) */}
              <Image
                src={item.cover}
                alt=""
                width={0}
                height={0}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full"
              />

              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-base font-normal uppercase text-[#E25A00]">
                  {t(`items.${item.key}.category`)}
                </p>

                <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                  {t(`items.${item.key}.title`)}
                </h3>

                <p className="mt-3 font-sans text-base font-normal text-black/70">
                  {t(`items.${item.key}.description`)}
                </p>

                <p className="mt-5 font-heading text-2xl font-medium text-ink">
                  {t(`items.${item.key}.price`)}
                </p>

                <p className="mt-1.5 font-sans text-base font-normal text-black/70">
                  {t("priceNote")}
                </p>

                {/* mt-auto keeps all six buttons on the same line in the grid */}
                <div className="mt-auto pt-6">
                  {/* Add onPress or wrap in a link later, once you decide where it goes */}
                  <Button
                    className="h-auto w-full rounded-full border border-brand/20 bg-white px-6 py-3.5 font-mono text-base font-medium uppercase leading-5 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {t("cta")}
                  </Button>
                </div>
              </div>
            </article>
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