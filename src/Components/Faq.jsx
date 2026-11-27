"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

// Replace this with your real WhatsApp link, e.g. https://wa.me/8801XXXXXXXXX
const WHATSAPP_URL = "https://wa.me/8801979053767";

// Each question reads its text from messages: Faq.items.<key>.question / .answer
const items = [
  "sourceCode",
  "delivery",
  "payment",
  "customize",
  "zatca",
  "refund",
];

// Shows the plus/minus SVG as a shape filled with white,
// so the color is right even if the file itself is dark
function ToggleIcon({ src }) {
  const mask = `url(${src})`;
  return (
    <span
      aria-hidden="true"
      className="block size-[13px] shrink-0 bg-white"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

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
      className="bg-[#090710] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20"
    >
      {/* On small screens the order is: heading -> FAQ -> card.
          On large screens: left column (heading + card), right column (FAQ). */}
      <div className="mx-auto grid max-w-[1284px] grid-cols-1 gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
        {/* Heading + description */}
        <header className="lg:col-start-1 lg:row-start-1">
          <h2 className="heading-tracking max-w-[480px] font-heading text-[32px] leading-9 font-normal text-white lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-[420px] text-base leading-[26px] text-white/70">
            {t("description")}
          </p>
        </header>

        {/* FAQ list */}
        <ul className="flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {items.map((key, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.li
                key={key}
                // Fade up when scrolled into view, one after another
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.07,
                }}
                className={`faq-item rounded-[10px] border bg-[#241A38] transition-colors duration-300 ${
                  isOpen
                    ? "border-brand-light/25"
                    : "border-white/5 hover:border-brand-light/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${key}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[10px] px-6 py-4 text-start font-heading text-lg leading-[22px] font-normal text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
                >
                  <span>{t(`items.${key}.question`)}</span>
                  <ToggleIcon
                    src={
                      isOpen ? "/assets/faq/minus.svg" : "/assets/faq/plus.svg"
                    }
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
                    <p className="px-6 pb-6 text-base leading-6 text-white/70 lg:pe-12">
                      {t(`items.${key}.answer`)}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Still have questions? card: two containers with a tiny gap */}
        <div className="flex flex-col gap-1 lg:col-start-1 lg:row-start-2 lg:max-w-[374px] lg:self-start">
          {/* Top container: icon */}
          <div className="rounded-xl bg-[#241A38] px-6 py-5">
            <Image
              src="/assets/faq/headphone.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
          </div>

          {/* Bottom container: title, description, button */}
          <div className="rounded-xl bg-[#241A38] p-6">
            <h3 className="font-heading text-xl leading-[30px] font-medium text-white">
              {t("card.title")}
            </h3>
            <p className="mt-3 text-base leading-7 text-white/70">
              {t("card.description")}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-3 text-base leading-[26px] font-normal text-white transition-[filter,box-shadow,scale] duration-300 hover:shadow-[0_0_28px_rgba(99,62,233,0.55)] hover:brightness-110 active:scale-[0.97] max-lg:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
            >
              {t("card.button")}
              <Image
                src="/assets/dot-btn.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}