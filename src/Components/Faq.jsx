"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Replace this with your real WhatsApp link, e.g. https://wa.me/8801XXXXXXXXX
const WHATSAPP_URL = "https://wa.me/0000000000";

// Each question reads its text from messages: Faq.items.<key>.question / .answer
const items = [
  "sourceCode",
  "delivery",
  "payment",
  "customize",
  "zatca",
  "refund",
];

export default function Faq() {
  const t = useTranslations("Faq");
  // Index of the open question. null = all closed. The first one starts open.
  const [openIndex, setOpenIndex] = useState(0);

  // Clicking the open question closes it. Clicking another one opens it
  // and closes the previous one.
  const toggle = (i) => setOpenIndex((current) => (current === i ? null : i));

  return (
    <section
      id="faq"
      className="bg-[#FBF8F4] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20"
    >
      {/* On small screens the order is: heading -> FAQ -> card.
          On large screens: left column (heading + card), right column (FAQ). */}
      <div className="mx-auto grid max-w-[1284px] grid-cols-1 gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
        {/* Heading + description */}
        <header className="lg:col-start-1 lg:row-start-1">
          <h2 className="heading-tracking max-w-[480px] font-heading text-[32px] leading-9 font-normal text-black lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-[420px] text-base leading-[26px] text-black/70">
            {t("description")}
          </p>
        </header>

        {/* FAQ list */}
        <ul className="flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {items.map((key, i) => {
            const isOpen = openIndex === i;

            return (
              <li key={key} className="rounded-[10px] bg-white">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${key}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-heading text-lg font-normal text-black"
                >
                  <span>{t(`items.${key}.question`)}</span>
                  <Image
                    src={
                      isOpen ? "/assets/faq/minus.svg" : "/assets/faq/plus.svg"
                    }
                    alt=""
                    width={13}
                    height={13}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                </button>

                {/* Smooth open/close: the row height goes from 0 to its content height */}
                <div
                  id={`faq-panel-${key}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-base leading-6 text-black/70 lg:pe-12">
                      {t(`items.${key}.answer`)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Still have questions? card: two containers with a tiny gap */}
        <div className="flex flex-col gap-1 lg:col-start-1 lg:row-start-2 lg:max-w-[360px] lg:self-start">
          {/* Top container: icon */}
          <div className="rounded-xl bg-white px-6 py-5">
            <Image
              src="/assets/faq/headphone.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
          </div>

          {/* Bottom container: title, description, button */}
          <div className="rounded-xl bg-white p-6">
            <h3 className="font-heading text-xl leading-[30px] font-medium text-black">
              {t("card.title")}
            </h3>
            <p className="mt-3 text-base leading-7 text-black/70">
              {t("card.description")}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-mono text-sm leading-[26px] font-normal text-white uppercase transition-opacity hover:opacity-90 max-lg:w-full"
            >
              {t("card.button")}
              <Image
                src="/assets/dot-btn.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="rtl:-scale-x-100"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}