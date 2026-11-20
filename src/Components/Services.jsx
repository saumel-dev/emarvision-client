import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

// Card ids. They are also the icon file names:
// public/assets/services/01.svg ... 09.svg
const items = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

// Small up-right arrow. It moves a little when the card is hovered,
// and flips to up-left in right-to-left languages.
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 rtl:group-focus-within:-translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section
      id="solutions"
      className="bg-[#090710] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20"
    >
      <div className="mx-auto max-w-[1284px]">
        {/* Heading + description */}
        <header className="text-center">
          <h2 className="heading-tracking font-heading text-[32px] leading-9 font-normal text-white lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-6 text-white/70 lg:text-lg lg:leading-[1.5]">
            {t("description")}
          </p>
        </header>

        {/* Cards: 1 column on phones, 2 on tablets, 3 on large screens */}
        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {items.map((id, i) => (
            <motion.li
              key={id}
              // Fade up when the card scrolls into view. The delay makes each row
              // appear left to right (column 1, then 2, then 3).
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.1,
              }}
              // "isolate" lets the glows sit behind the text but above the card color
              className="service-card group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1D1929] p-8 transition-[translate,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-brand-light/30 hover:shadow-[0_24px_60px_-24px_rgba(99,62,233,0.6)] focus-within:border-brand-light/30"
            >
              {/* Glow behind the icon (always on, brighter on hover) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -start-[66px] -top-[66px] -z-10 size-64 bg-[radial-gradient(closest-side,rgba(118,85,237,0.55),transparent)] opacity-75 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
              />
              {/* Glow behind the button (faint by default, stronger on hover) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -start-[57px] -bottom-[18px] -z-10 h-[150px] w-[300px] bg-[radial-gradient(closest-side,rgba(118,85,237,0.4),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
              />

              <Image
                src={`/assets/services/${id}.svg`}
                alt=""
                width={60}
                height={60}
                aria-hidden="true"
              />

              <h3 className="mt-10 font-heading text-xl leading-[30px] font-medium text-white">
                {t(`items.${id}.title`)}
              </h3>
              <p className="mt-3 text-lg leading-7 text-white/60">
                {t(`items.${id}.description`)}
              </p>

              {/* mt-auto keeps the buttons on the same line across a row */}
              <div className="mt-auto pt-8">
                {/* The ::after layer stretches the link over the whole card */}
                <a
                  href="#contact"
                  aria-label={`${t("explore")}: ${t(`items.${id}.title`)}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-lg leading-[30px] text-white transition-[background-color,border-color,box-shadow,scale] duration-300 group-hover:border-brand group-hover:bg-brand group-hover:shadow-[0_0_32px_rgba(99,62,233,0.55)] group-focus-within:border-brand group-focus-within:bg-brand group-active:scale-[0.97] after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
                >
                  {t("explore")}
                  <ArrowIcon />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}