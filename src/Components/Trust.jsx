import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

// Card ids. They are also the icon file names:
// public/assets/payment/01.svg ... 04.svg
const items = ["01", "02", "03", "04"];

// Payment logos, in the same order as the design.
// Brand names are not translated, so they are used directly as alt text.
const logos = [
  { file: "tabby", name: "Tabby" },
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "stripe", name: "Stripe" },
  { file: "apple-pay", name: "Apple Pay" },
  { file: "mada", name: "mada" },
];

export default function Trust() {
  const t = useTranslations("Trust");

  return (
    <section className="bg-[#090710] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Heading + description */}
        <header className="text-center">
          <h2 className="heading-tracking mx-auto max-w-[560px] font-heading text-[32px] leading-9 font-normal text-balance text-white lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-[26px] text-white/70">
            {t("description")}
          </p>
        </header>

        {/* Cards: 1 column on phones, 2 on tablets, 4 on large screens */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {items.map((id, i) => (
            <motion.li
              key={id}
              // Fade up when scrolled into view. Cards appear left to right.
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 4) * 0.1,
              }}
              // "isolate" keeps the glow behind the text but above the card color
              className="trust-card group relative isolate overflow-hidden rounded-xl border border-white/5 bg-[#241A38] p-[30px] transition-colors duration-300 hover:border-brand-light/25 lg:min-h-[275px]"
            >
              {/* Purple glow behind the icon (a blurred circle, like Figma's Ellipse) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -start-8 -top-11 -z-10 size-[150px] rounded-full bg-brand/40 blur-[22px] transition-colors duration-500 group-hover:bg-brand/60"
              />

              <Image
                src={`/assets/payment/${id}.svg`}
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
              />

              <h3 className="mt-8 font-heading text-lg leading-[26px] font-medium text-white">
                {t(`items.${id}.title`)}
              </h3>

              <p className="mt-2.5 text-[15px] leading-[22px] text-white/70">
                {t(`items.${id}.description`)}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Secure checkout + payment logos */}
        <div className="mt-12 flex flex-col items-center lg:mt-16">
          <p className=" text-base leading-4 tracking-[0.2em] text-white/70 uppercase">
            {t("secureCheckout")}
          </p>

          {/* max-w makes the logos wrap into 2 rows of 3 on phones */}
          <ul className="mt-6 flex max-w-[260px] flex-wrap items-center justify-center gap-2 lg:max-w-none">
            {logos.map((logo) => (
              <li key={logo.file}>
                <Image
                  src={`/assets/payment/${logo.file}.svg`}
                  alt={logo.name}
                  width={72}
                  height={30}
                  className="h-[30px] w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}